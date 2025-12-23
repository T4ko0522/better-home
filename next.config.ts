import type { NextConfig } from "next";

/**
 * 静的エクスポートを使用するかどうか
 * .env.localでSTATIC_EXPORT=trueを設定すると静的エクスポートが有効になる
 * デフォルトではfalse（APIルートを使用可能）
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  ...(isStaticExport && { output: "export" }),
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
