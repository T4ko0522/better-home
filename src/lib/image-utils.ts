/**
 * ファイルをData URLに変換する
 *
 * @param {File} file - 変換するファイル
 * @returns {Promise<string>} Data URL
 */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * 動画ファイルまたは動画URLからサムネイル画像を生成する
 *
 * @param {File | string} source - 動画ファイルまたは動画URL
 * @param {number} seekTime - サムネイルを取得する時間（秒）、デフォルト: 0
 * @returns {Promise<string>} サムネイル画像のData URL
 */
export async function generateVideoThumbnail(
  source: File | string,
  seekTime: number = 0
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }

    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    let objectUrl: string | null = null;

    const cleanup = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };

    video.onloadedmetadata = () => {
      // サムネイルのサイズを決定（最大1920x1080）
      let width = video.videoWidth;
      let height = video.videoHeight;
      const maxWidth = 1920;
      const maxHeight = 1080;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = Math.min(width, maxWidth);
          height = width / aspectRatio;
        } else {
          height = Math.min(height, maxHeight);
          width = height * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // 指定時間にシーク
      video.currentTime = Math.min(seekTime, video.duration || 0);
    };

    video.onseeked = () => {
      try {
        // 現在のフレームをキャンバスに描画
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        cleanup();
        resolve(dataUrl);
      } catch (error) {
        cleanup();
        reject(new Error(`Failed to generate thumbnail: ${error}`));
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Failed to load video"));
    };

    // ソースを設定
    if (source instanceof File) {
      objectUrl = URL.createObjectURL(source);
      video.src = objectUrl;
    } else {
      video.src = source;
    }

    video.load();
  });
}
