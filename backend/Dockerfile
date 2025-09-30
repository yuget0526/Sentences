# Pythonベースのイメージ
FROM python:3.12-slim

WORKDIR /app

# 必要なファイルをコピー
COPY requirements.txt ./
COPY main.py ./
COPY api ./api

# 依存関係インストール
RUN pip install --no-cache-dir -r requirements.txt

# FastAPI起動（main.pyにappがある前提）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
