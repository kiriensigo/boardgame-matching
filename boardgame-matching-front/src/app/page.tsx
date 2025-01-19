"use client";
import { useEffect, useState } from "react";
import { login, logout } from "../lib/auth";

type ApiResponse = {
  status: string;
  logged_in: boolean;
  user?: {
    email: string;
  };
};

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ログインフォームの送信処理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(email, password);
      // ログイン成功後、ページの状態を更新
      window.location.reload();
    } catch (error) {
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await logout();
      // ログアウト成功後、ページの状態を更新
      window.location.reload();
    } catch (error) {
      setError("ログアウトに失敗しました。");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          credentials: "include", // Cookieを含める
        });
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        ボードゲームマッチング
      </h1>

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}

      {apiData?.logged_in ? (
        <div>
          <p>ようこそ、{apiData.user?.email}さん！</p>
          <button
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <h2>ログイン</h2>
              <input
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                ログイン
              </button>
            </div>
          </form>

          <button
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              /* Google認証は後で実装 */
            }}
          >
            Googleでログイン
          </button>

          <button
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => {
              /* 新規登録は後で実装 */
            }}
          >
            新規登録
          </button>
        </div>
      )}
    </div>
  );
}
