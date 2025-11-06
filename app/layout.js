import "./globals.css";

export const metadata = {
  title: "My Next.js App",
  description: "Next.js 13 + React 18 + Docker + MySQL 環境",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header>
          <h1>Next.js 13 + React 18 + Docker + MySQL 環境</h1>
        </header>

        {children} {/* ← 各ページ（page.jsなど）がここに入る */}

        <footer>
          <p>&copy; 2025 Yoshiki Fukushi</p>
        </footer>
      </body>
    </html>
  );
}