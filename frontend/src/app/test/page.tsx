"use client";
import { useEffect, useState } from "react";
import { InputUrl } from "@/components/ui/inputUrl";
import { NewsListItem } from "@/components/ui/newsListItem";
import IpadLayout from "@/components/layout/Ipad";

export default function TestPage() {
  const [articles, setArticles] = useState<
    {
      title: string;
      url: string;
      summary?: string;
      lastupdate?: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("http://localhost:8000/get_news/bbc?url=https://www.bbc.com/news")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <IpadLayout>
      <div className="p-8 bg-newspaper font-ui h-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-on-newspaper pl-4 pr-4">
          URLを入力、またはニュース一覧から気になる記事を選んで始めよう！
        </h1>
        <div className="mb-4 p-4">
          <InputUrl placeholder="ニュースのURLを入力..." />
        </div>
        <ul className="pl-4 pr-4">
          {articles.map((article, idx) => (
            <NewsListItem
              key={idx}
              title={article.title}
              url={article.url}
              summary={article.summary}
              lastupdate={article.lastupdate}
            />
          ))}
        </ul>
      </div>
    </IpadLayout>
  );
}
