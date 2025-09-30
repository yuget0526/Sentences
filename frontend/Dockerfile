# Node.jsベースのイメージ
FROM node:22-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY . .

RUN npm install --legacy-peer-deps

# Next.jsのビルド
RUN npm run build

EXPOSE 3000

CMD ["npx", "next", "start"]
