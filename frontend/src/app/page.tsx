"use client";

import IpadLayout from "@/components/layout/Ipad";
import { InputUrl } from "@/components/ui/inputUrl";
import { NewsListItem } from "@/components/ui/newsListItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBBCNewsList } from "@/lib/api";
import type { BBCNewsListItem } from "@/types/bbc";

export default function Home() {
  const [newsList, setNewsList] = useState<BBCNewsListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchBBCNewsList()
      .then((data) => setNewsList(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "エラーが発生しました")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputUrl.trim()) {
      router.push(`/news?url=${encodeURIComponent(inputUrl.trim())}`);
    }
  };

  return (
    <>
      <div className="container mx-auto h-full">
        <IpadLayout>
          <div className="flex flex-col items-center justify-center h-full bg-newspaper px-4 py-8">
            {/* ニュースURL入力欄 */}
            <InputUrl
              placeholder="BBCニュースの記事URLを入力してください"
              className="text-center"
              value={inputUrl}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            {/* 今日のピックアップニュース */}
            <ul className="w-full max-w-2xl mt-4 h-full overflow-y-auto">
              {loading && <li>ニュース取得中...</li>}
              {error && <li className="text-red-500">{error}</li>}
              {!loading &&
                !error &&
                newsList.map((item, idx) =>
                  item.url.includes("/news/articles/") ? (
                    <NewsListItem
                      key={item.url + idx}
                      title={item.title}
                      url={item.url}
                      summary={item.summary}
                      lastupdate={item.lastupdate}
                    />
                  ) : null
                )}
            </ul>
          </div>
        </IpadLayout>
      </div>
    </>
  );
}

export function HomeWithHeader() {
  return (
    <>
      <Home />
    </>
  );
}
