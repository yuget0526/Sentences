import { BBCAPIResponse, BBCNewsListResponse } from "@/types/bbc";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchBBCArticle(url: string): Promise<BBCAPIResponse> {
  const response = await fetch(
    `${API_BASE_URL}/get_sentences/bbc?url=${encodeURIComponent(url)}`
  );
  if (!response.ok) {
    throw new Error(`BBCの記事取得に失敗しました: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchBBCNewsList(): Promise<BBCNewsListResponse> {
  const response = await fetch(
    `${API_BASE_URL}/get_news/bbc?url=https://www.bbc.com/news`
  );
  if (!response.ok) {
    throw new Error(
      `BBCニュース一覧取得に失敗しました: ${response.statusText}`
    );
  }
  return response.json();
}
