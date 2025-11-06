# 🐳 Next.js 13 + React 18 + MySQL + phpMyAdmin (Docker構成)

Next.js（App Router構成）＋ MySQL ＋ phpMyAdmin を
Docker Compose で簡単に立ち上げられる開発環境です。

---

## 🚀 環境概要

| サービス           | 内容                        | ポート                                            |
| -------------- | ------------------------- | ---------------------------------------------- |
| **web**        | Next.js 13.5.4 / React 18 | [http://localhost:3000](http://localhost:3000) |
| **db**         | MySQL 8.0                 | localhost:3253                                 |
| **phpmyadmin** | MySQL管理ツール                | [http://localhost:8022](http://localhost:8022) |

---

## 📦 必要なもの

* Docker Desktop（WSL2対応版）
* Git

---

## 🧰 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/fks-dev/next13react18.git
cd next13react18
```

### 2. 環境変数の確認（任意）

`docker-compose.yml` 内で以下の環境変数を確認・変更できます：

```yaml
MYSQL_ROOT_PASSWORD: password
MYSQL_DATABASE: next_app
MYSQL_USER: next_user
MYSQL_PASSWORD: password
```

---

### 3. コンテナを起動（初回だけ）

```bash
docker compose up -d --build
```

### 💡初回起動時の注意

---

初回起動時に v / o / w などのヒントが表示される場合があります。
これは Docker Compose の標準メッセージで、そのまま閉じても問題ありません。

ただし、この画面が出ている間ターミナル操作ができなくなります。
Dockerを止めずに Git 操作などに戻りたい場合は、次の手順を実行してください👇

```bash
Ctrl + Z     # 一時停止（Dockerをバックグラウンドに送る）
bg            # 再開（バックグラウンドで動かす）
```

これでコンテナは動かしたまま、
ターミナルにプロンプト（$）が戻り、自由に操作できるようになります。

---

#### 起動後アクセス

* Next.js → [http://localhost:3000](http://localhost:3000)
* phpMyAdmin → [http://localhost:8022](http://localhost:8022)

  * サーバー: `db`
  * ユーザー: `root`
  * パスワード: `password`

---

### 4. コンテナの状態確認

```bash
docker ps
```

---

### 5. 2回目以降は

```bash
docker compose up -d
```

---

## 🗂 ディレクトリ構成

```
Next13React18/
├─ app/
│  ├─ page.js          # トップページ
│  ├─ page.css         # トップページCSS
│  ├─ layout.js        # 共通レイアウト
│  └─ globals.css      # 全体スタイル
├─ docker-compose.yml  # Docker構成
├─ Dockerfile          # Node.js環境
├─ package.json        # Next.js設定
└─ README.md           # このファイル
```

---

## 🧪 DB接続テスト

`app/page.js` にサンプルとして MySQL へ接続するコードがあります。

```js
import mysql from "mysql2/promise";

// MySQL接続
const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 現在時刻を取得
const [rows] = await conn.query("SELECT NOW() as now");
await conn.end();


現在時刻:{" "}
{rows[0].now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}


```

---

### ❌ ポートが被る

→ `docker-compose.yml` の `ports` 左側を変更（例：`3333:3306`）

---

## 👥 作者

* yoshiki.fukushi
* 環境: Next.js 13.5.4 / React 18 / Node 18 / MySQL 8.0 / phpMyAdmin 5

---

