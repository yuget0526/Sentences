# このファイルはBeautifulSoup4を用いて、<https://www.bbc.com/news>のページから
# 最新のニュース記事のURL、タイトル、画像リンクを抽出し、それらをJSON形式で返すPythonスクリプトです。

import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

def get_bbc_news(url=None):
    default_url = "https://www.bbc.com/news"
    url = url or os.getenv('BBC_NEWS_URL', default_url)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    soup = soup.find("div", {"data-testid": "virginia-section-8"})

    elems = soup.find_all("a", href=lambda x: x and "/news/articles/" in x)
    articles = []
    for elem in elems:
        title = elem.get_text(strip=True)
        link = urljoin(url, elem.get("href"))
        summary_elem = elem.find("p", {"data-testid": "card-description"})
        summary = summary_elem.get_text(strip=True) if summary_elem else ""
        lastupdate = elem.find("span", {"data-testid": "card-metadata-lastupdated"})
        articles.append({"title": title, "url": link, "summary": summary, "lastupdate": lastupdate.get_text(strip=True) if lastupdate else ""})

    return articles

if __name__ == "__main__":
    print(get_bbc_news())