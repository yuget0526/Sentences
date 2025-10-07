import { BBCArticle } from "@/types/bbc";
import { fetchFreeDictionaryDefinition } from "@/lib/api";
import React, { useState, useRef } from "react";

// BBCの記事データを受け取り、新聞風のレイアウトで表示するコンポーネント
export interface NewspaperProps {
  article: BBCArticle;
}

export const Newspaper: React.FC<NewspaperProps> = ({ article }) => {
  const [tooltip, setTooltip] = useState<{
    word: string;
    meaning: string;
    x: number;
    y: number;
  } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 単語にマウスが乗ったとき意味を取得
  const handleMouseEnter = async (
    word: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await fetchFreeDictionaryDefinition(word);
        const meaning =
          data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "No definition found.";
        setTooltip({ word, meaning, x: e.clientX, y: e.clientY });
      } catch {
        setTooltip({
          word,
          meaning: "意味が見つかりません",
          x: e.clientX,
          y: e.clientY,
        });
      }
    }, 250);
  };
  // マウスが離れたらツールチップ非表示
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTooltip(null);
  };

  return (
    <div
      className="mx-auto max-w-4xl bg-newspaper text-on-newspaper p-8 shadow-lg border border-gray-200 relative"
      style={{ zIndex: "var(--zIndex-contentNewspaper)" }}
    >
      {/* ヘッダー */}
      <div className=" pb-4 mb-6">
        <h1 className="font-display text-4xl text-left mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex justify-between items-center text-sm text-gray-600 font-ui">
          <div>
            <span className="font-semibold">{article.writer}</span>
            {article.writerRoleLocation && (
              <span className="ml-2">• {article.writerRoleLocation}</span>
            )}
          </div>
          <div>
            {new Date(article.date).toLocaleDateString("en-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {new Date(article.date).toLocaleTimeString("en-JP")}
          </div>
        </div>
      </div>
      {/* 本文 */}
      <div className="space-y-4 font-text text-2xl">
        {article.content.map(
          (paragraph: string[][], paragraphIndex: number) => (
            <div
              key={paragraphIndex}
              className="text-justify leading-relaxed mb-10"
            >
              {paragraph.map((sentence: string[], sentenceIndex: number) => (
                <div key={sentenceIndex} className="mb-4">
                  {sentence.map((word: string, wordIndex: number) => (
                    <span
                      key={wordIndex}
                      className="hover:bg-stone-300 transition-colors cursor-pointer inline-block pl-0.5 pr-0.5 mr-1.5"
                      onMouseEnter={(e) => handleMouseEnter(word, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )
        )}
      </div>
      {/* ツールチップ */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 12,
            top: tooltip.y + 12,
            zIndex: 9999,
            background: "#fffbe6",
            color: "#222",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            minWidth: "180px",
            maxWidth: "320px",
            fontSize: "1rem",
            pointerEvents: "none",
          }}
        >
          <div className="font-bold mb-1">{tooltip.word}</div>
          <div>{tooltip.meaning}</div>
        </div>
      )}
      {/* フッター */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500">
        <p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-on-newspaper"
          >
            {article.url}
          </a>
        </p>
      </div>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-[url('/image/papernoise.webp')] bg-repeat opacity-[.16] pointer-events-none"
        style={{
          backgroundSize: "400px 400px",
          zIndex: "var(--zIndex-noiseNewspaper)",
        }}
      ></div>
    </div>
  );
};
