# このファイルはBeautifulSoup4を用いて、<https://www.bbc.com/>のニュース記事から
# 見出しと本文を段落ごとに抽出し、それらをJSON形式で保存するPythonスクリプトです。

import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin


def get_bbc_data(url=None):
    default_url = 'https://www.bbc.com/news/articles/cr70rg7ejdpo'
    url = url or os.getenv('BBC_NEWS_URL', default_url)
    res = requests.get(url, timeout=10)
    soup = BeautifulSoup(res.text, "html.parser")
    elems = soup.find("main", {"id": "main-content"}).find("article")
    title_elem = soup.find("div", {"data-component": "headline-block"}).find("h1")
    date_elem = elems.find("div", {"data-component": "byline-block"}).find("time")
    writer_elem = elems.find("div", {"data-component": "byline-block"}).find("span", {"class": "fBuaoy"})
    writer_role_location_elem = elems.find("div", {"data-component": "byline-block"}).find("span", {"data-testid": "undefined-role-location"})
    content_elems = elems.find_all("div", {"data-component": "text-block"})

    data = {
        "url": url,
        "title": title_elem.get_text() if title_elem else "No Title Found",
        "date": date_elem.get("datetime") if date_elem else "No Date Found",
        "writer": writer_elem.get_text() if writer_elem else "No Writer Found",
        "writerRoleLocation": writer_role_location_elem.get_text() if writer_role_location_elem else "No Role/Location Found",
        "imageSource": "",
        "content": []
    }

    for paragraph in content_elems:
        sentences = []
        for sentence in paragraph.find_all("p"):
            text = sentence.get_text().strip()
            if text:
                words = text.split()
                sentences.append(words)
        if sentences:
            data["content"].append(sentences)
    return data

if __name__ == "__main__":
    print(get_bbc_data('https://www.bbc.com/news/articles/czxwl15w2qko'))