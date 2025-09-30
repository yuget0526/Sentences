from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from api.get_sentences.bbc import get_bbc_data
from api.get_news.bbc import get_bbc_news


app = FastAPI(
    title="Sentences API",
    description="Sentences APIはWebアプリSentencesのバックエンドAPIです。",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BBCRequest(BaseModel):
    url: str = None

# エラーハンドリング関数
def get_sentences_url_error(url: str, prefix: str) -> str:
    """
    URLが未指定、またはprefixに一致しない場合はHTTPExceptionを返す関数
    """
    if not url:
        raise HTTPException(status_code=400, detail="URLパラメータが必要です")
    if not url.startswith(prefix):
        raise HTTPException(status_code=400, detail=f"URLは {prefix} で始まるBBCニュース記事のみ指定可能です")
    return url


@app.get(
    "/get_news/bbc",
    summary="BBCニュース記事の一覧取得",
    description="<https://www.bbc.com/news>から最新のニュース記事のURL、タイトル、画像リンクをJSONで返します。",
    tags=["get_news"]
)
def get_bbc_news_get(url: str = Query(None, description="BBCニュース記事一覧のURLを指定してください")):
    """
    BBCニュース記事のURL、タイトル、画像リンクをJSONで返します。
    """
    url = get_sentences_url_error(url, "https://www.bbc.com")
    try:
        articles = get_bbc_news()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"データ取得エラー: {str(e)}")
    return articles


@app.get(
    "/get_sentences/bbc",
    summary="BBCニュース記事の構造化データ取得",
    description="<https://www.bbc.com/news/>から始まるBBCニュース記事のURLをクエリパラメータで指定すると、記事の見出し・本文・段落・単語ごとに分割したデータをJSONで返します。",
    tags=["get_sentences"]
)
def get_bbc_sentences_get(url: str = Query(None, description="BBCニュース記事のURLを指定してください")):
    """
    BBCニュース記事のURLを指定すると、記事の構造化データ（見出し・本文・段落・単語ごと）をJSONで返します。
    - url: BBCニュース記事のURL
    """
    url = get_sentences_url_error(url, "https://www.bbc.com/news/")
    try:
        data = get_bbc_data(url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"データ取得エラー: {str(e)}")
    return data
