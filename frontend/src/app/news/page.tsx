"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Newspaper } from "@/components/Newspaper";
import { fetchBBCArticle } from "@/lib/api";
import { BBCArticle } from "@/types/bbc";

function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const [article, setArticle] = useState<BBCArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url.trim()) {
      router.replace("/");
      return;
    }
    setLoading(true);
    setError(null);
    fetchBBCArticle(url)
      .then((data) => setArticle(data))
      .catch((err) => {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      })
      .finally(() => setLoading(false));
  }, [url, router]);

  return (
    <div className="container mx-auto px-4">
      {loading && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
          記事取得中...
        </div>
      )}
      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {article && <Newspaper article={article} />}
    </div>
  );
}

export default function NewsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsPage />
    </Suspense>
  );
}
