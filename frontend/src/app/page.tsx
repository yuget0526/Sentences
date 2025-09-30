"use client";

import { useState } from "react";
import { Newspaper } from "@/components/Newspaper";
import { fetchBBCArticle } from "@/lib/api";
import { BBCAPIResponse } from "@/types/bbc";

export default function Home() {
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState<BBCAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchBBCArticle(url);
      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4"></div>
    </>
  );
}
