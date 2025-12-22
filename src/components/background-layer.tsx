import * as React from "react";

/**
 * BackgroundLayerコンポーネントのプロパティ
 */
interface BackgroundLayerProps {
  /** 現在の背景画像URL */
  currentImage: string | null;
  /** 動画かどうか */
  isVideo: boolean;
  /** 背景スタイル */
  backgroundStyle: React.CSSProperties;
  /** ビデオ要素のRef */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** 動画が読み込まれたか */
  isVideoLoaded: boolean;
  /** 動画読み込み状態を更新する関数 */
  setIsVideoLoaded: (loaded: boolean) => void;
  /** オーバーレイを表示するか */
  showOverlay: boolean;
}

/**
 * 背景レイヤーコンポーネント
 * 背景画像や動画、オーバーレイを表示する
 *
 * @param {BackgroundLayerProps} props - コンポーネントのプロパティ
 * @returns {React.ReactElement} 背景レイヤー
 */
export const BackgroundLayer = ({
  currentImage,
  isVideo,
  backgroundStyle,
  videoRef,
  isVideoLoaded,
  setIsVideoLoaded,
  showOverlay,
}: BackgroundLayerProps): React.ReactElement => {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-background"
      style={backgroundStyle}
    >
      {/* 背景動画 */}
      {currentImage && isVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={currentImage}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            setIsVideoLoaded(true);
          }}
          onError={(e) => {
            const video = e.currentTarget;
            console.error("Video load error:", {
              error: video.error,
              code: video.error?.code,
              message: video.error?.message,
              src: currentImage,
              networkState: video.networkState,
              readyState: video.readyState,
            });
          }}
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}
      {/* オーバーレイ（背景メディアがある場合かつ設定で有効な場合のみ表示） */}
      {currentImage && showOverlay && (
        <div className="absolute inset-0 bg-background/20 dark:bg-background/40 z-1" />
      )}
    </div>
  );
};

