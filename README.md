# 🐳 Next.js 13 + React 18 + MySQL + phpMyAdmin (Docker構成)

Next.js（App Router構成）＋ MySQL ＋ phpMyAdmin を  
Docker Compose で簡単に立ち上げられる開発環境です。  
案件に伴い、勉強用に作成しました。
メモ帳用途に使用してるので、クオリティの低さはご了承ください。

---

### 🧠 使用技術の概要

- **React**：Meta（旧Facebook）が開発したUIライブラリ。  
  コンポーネント単位で画面を構築し、再利用性が高い。  
  SPAのようなサクサク画面が動くUIページを作れる。  

- **Next.js**：Reactベースのフレームワーク。  
  フロントエンドはReact、バックエンドは Node.js で動いてます。
  ページ生成の仕組みは4種類あり、**動的**（CSR・SSR）と **静的**（SSG・ISR）に分かれます。

  | 種類 | いつHTMLを作る？ | 特徴 | 向いてるページ |
  |------|------------------|------|----------------|
  | **CSR** | ブラウザで実行 | JSで描画。最初は空HTML。 | SPA・管理画面 |
  | **SSR** | アクセス時にサーバーで生成 | 最新データ・SEOに強い。 | ニュース・商品詳細 |
  | **SSG** | ビルド時に生成 | 超速い。CDN配信OK。 | ブログ・LP・企業サイト |
  | **ISR** | SSG＋一定時間で再生成 | 静的＋更新対応。 | 商品一覧・記事一覧 |
  
> <sub>📝 **補足**  
> ・**SPA（Single Page Application）**：最初に1ページ読み込み、以後は JavaScript が中身だけ更新。ページ再読み込みなしで動く。  
> ・**MPA（Multi Page Application）**：ページごとにHTMLを再読込。yahooサイトみたいなクリックしたらページが全体が再読み込みされるサイトがこれにあたる。  
> ・**CDN（Content Delivery Network）**：サイトのデータを世界中のサーバーにコピーして、近い場所から配信。どの国からでも高速表示できる。</sub>

- **Next.js 13 の構成**：  
  コンポーネントは動作場所で役割が分かれます。  
  **Server Component** が「ページの土台（見た目）」をつくり、  
  その中で **Client Component** が「動きを担当」します。  
例）
  app/  
  ├─ page.js ← 🖥 Server Component（データ取得・HTML生成）  
  └─ Button.js ← 💻 Client Component（ユーザー操作・アニメーション）  


---

### 💡 Next.js・React・TypeScript の関係

さらにここから **TypeScript（JavaScriptの型付き拡張言語）** を導入して学習することも可能です。  
今回は ~~（私の頭がパンクしそうなので）~~ 導入していませんが、  まずは **Next.js と React** の理解を優先しましょう。  
Next.jsは、TypeScript対応が標準で組み込まれてるので、案件で必要な方は **依存パッケージ追加** を各自導入お願いします。  
またTypeScript導入後は **.js** の拡張子を **.tsx** に書き換える必要があります。
下記に関係性をメモしておきます。  

- **TypeScript** は **JavaScriptの拡張言語** で、Next.jsの開発にも組み込まれることが多いです。  
  型チェックや補完機能によって、大規模開発やチーム開発がしやすくなります。  
  Laravelでいうところの **Requestバリデーションや型指定のような仕組み** が、  
  TypeScriptでは「コードを書く段階」で自動的に働くイメージです。  
  実行前に「この値は文字列じゃなくて数値だよ」などと教えてくれるため、  
  **ミスを防ぐガイド付きのペン（型があるため安全）** と考えるとわかりやすいです。  

- **React だけでもアプリは作れます** が、  
  **Next.js** と組み合わせることで、より効率的で実践的な開発が可能になります。
  おそらくNext.js/React のほとんどの案件で使用されていると思われます・・・。

- 学習の流れとしては、  
  👉 **React → Next.js → TypeScript** の順番で学ぶのが最もスムーズです。

---

### 🎥 学習用動画

ページ下部におすすめの学習動画リンクを掲載しています。  
環境構築が完了したら、順に見ながら進めていきましょう！

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
│  ├─ page.js           # トップページ
│  ├─ page.css          # トップページCSS
│  ├─ layout.js         # 共通レイアウト（ヘッダーやフッターなど）
│  └─ globals.css       # 全体スタイル
├─ .dockerignore        # Dockerビルド時に除外するファイル
├─ .gitignore           # Gitで追跡しないファイルを指定
├─ docker-compose.yml   # Docker構成（Next.js + MySQL + phpMyAdmin）
├─ Dockerfile           # Node.js 18 (Alpine) 環境定義
├─ next.config.mjs      # Next.jsの設定（ルートやビルド設定など）
├─ package.json         # npmパッケージ設定
├─ package-lock.json    # npm依存関係固定
└─ README.md            # このファイル（環境説明書）
```

Next.js では、`.js` ファイルの中に JSX（HTMLのような構文）を書いても問題なく動きます。  
Next.js が内部で自動的に変換してくれるため、特別な設定は不要です。  

一方で `.jsx` は、「このファイルは React 用のコードですよ」と明示するための拡張子です。  
つまり `.js` でも `.jsx` でも動作は同じですが、**見た目で区別しやすくなる**という違いがあります。  
プロジェクトによって拡張子の書き方が異なるので、現場に合わせましょう（って書いてありました）。  

| 環境・プロジェクト規模 | よく使われる拡張子 | 理由 |
|------------------------|------------------|------|
| **Next.js系（App Router）** | `.js` が主流 | Next.jsが自動でJSXを解釈するため、余計な拡張子を増やさない。公式テンプレートも `.js`。 |
| **React単体（ViteやCRAなど）** | `.jsx` が多い | 「このファイルはReactコンポーネント」と明示したいチームが多い。 |
| **TypeScriptプロジェクト** | `.tsx` 一択 | 型情報とJSXを両方扱うため。.tsもあるがこの場合はJSX記述すべきではないとの意思表示になる。 |

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

### 📓🎥 React学習

以下は、Next.js と React Hooks の理解を深めるための学習用動画です。  
実務で使う前に一度見ておくと、コード構造や考え方がしっかり身につきます。

**公式サイトでも学習を進めることができるので、ここは"全て"目を通しましょう。（日本語対応）**
> 🔗 [React 公式ドキュメント](https://ja.react.dev/)

**この動画も凄くわかりやすいです。ファイル名とコードを合わせて学習をしましょう(7:50前後)。**
>🔗 [【React入門】完全初心者OK！１から簡単なTodoアプリを作ってReactの１歩を踏み出してみよう Reactチュートリアル](https://www.youtube.com/watch?v=nRCNL9T3J98&t=471s)

**React HooksはNext.jsでも必須技術なのでここで基本をしっかり押さえましょう(Vite環境)**  
> 🔗 [React Hooks入門](https://www.youtube.com/watch?v=uuAdVs7sbAs)

> ※補足※  
> **Vite（ヴィート）** は、React や Vue.js などをすぐに動かせるようにしてくれる  
> 「開発用のツール（ビルドツール）」です。フレームワークではありません。
> React や Vue.js が鉛筆だとしたら Viteは 作業机 です。  
> ノーバンドルツールと言われ、動作が高速のため、実務案件でも採用されています。  

### 🎥 Next.js学習
### コードを一度すべて削除して、動画の手順どおりに進めると全体の流れがつかみやすいです(8:20前後）。  
**Next.js 13入門 - App Router対応**  
> 🔗 [Next.js 13 入門 - App Router対応（YouTube）](https://www.youtube.com/watch?v=lO-Ulx1rclk&t=500s)

> Next.js 13の新しい構造（`app/`ディレクトリやServer/Client Components）を  
> わかりやすく解説してくれる動画。Next.jsを初めて触る人に最適です。

---

## 🫛 Vue.jsとNuxt.jsって見たことあるけど、これは何？

**Vue.js** は **Reactと同じくUIライブラリ** ですが、  
フレームワーク機能も備えており、HTML・CSS・JSを分けて書けるのが大きな特徴です。  
HTMLに近い感覚でサクッと作れるので、直感的に扱いやすいと人気です。  
既存の静的HTMLサイトに少しだけ動きを追加したい場合、Vue.jsは「1ページの一部だけに適用」も可能です。  
React や Next.js、Nuxt.js のように全体をフレームワークで固める必要がないため、Vue.js は小規模サイトでの採用事例が多いです。  

「Reactは自由度が高いけど難しい…もっとわかりやすく開発したい！」  
という声から生まれたのが **Vue.js** です。  

そして、**Vue.js用のフレームワーク** が **Nuxt.js（読み: ナクスト）**。  
誤字ではなく、ちゃんとした名前です…ややこしいですよね。  

まとめると👇  

> React → Next.js  
> Vue → Nuxt.js  

どちらも TypeScript に対応していますが、必須ではなく、  
JavaScriptだけでも同じように開発が可能です。

---

### 🧠 どうして名前が似てるの？

開発者たちが「Vue版 Next.js を作ろう！」という発想で名前をつけたため、  
- **Next.js** は React の “Next”  
- **Nuxt.js** は Vue の “Next”（N + Vue = Nuxt）  

というネーミングになっています。面白いです...。起源がわかるとすんなり入ってきます!  

「Nuxt.jsの方が後発だから強そう！」と思うかもしれません（私も最初そうでした）。  
でも、実際には **Next.js の方が自由度が高く、周辺ツールも非常に豊富** で、  
多くの大手企業で採用されています。  
**Next.js採用例）** Netflix、Hulu、Nike（ナイキ）、Adidas（アディダス）、Uber、Starbucks  

Vue.js/Nuxt.js はその **“良いところ”** を参考にして作られた、 **軽くて扱いやすいフレームワークです。**  
React が部品を自由に組む「レゴ」だとしたら、 Vue.js は型が決まった「プラモデル」です。  
**vue.js採用例)** Nintendo の欧州サイト、Xiaomi Corporation（中国）、Alibaba Group（中国）  
**Nuxt.js採用例)** JSW Group（インド）、n8n（ドイツ：SaaS）、Baxter（イタリア・メーカー）

---

まだ私自身、学習が追いついてないので、理解が深まったらちまちまとリニューアルします。
現在Next.jsは14,15,16まで出ており、15以降では破壊的なアップデートがありましたので、15を学ぶ方は参考になりませんのでご注意ください。





















































































