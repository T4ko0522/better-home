"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 404ページ: ホームにリダイレクト
 *
 * @returns {React.ReactElement} 404ページのコンポーネント
 */
export default function NotFound(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-muted-foreground">リダイレクト中...</p>
      </div>
    </div>
  );
}

