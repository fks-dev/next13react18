import "./globals.css";
import "./page.css";
import mysql from "mysql2/promise";

export default async function Page() {
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

    // JSXを返す
    return (
        <main className="home">
            <h1>学習用環境</h1>
            <p>ホットリロードできます。ファイルを保存すると即反映されます。</p>
            <hr />
            <h2>DB接続テスト</h2>
            <p>
                現在時刻:{" "}
                {rows[0].now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
            </p>

        </main>
    );
}