'use client';
import { useEffect, useState } from 'react';
import { logout } from '../lib/auth';

type ApiResponse = {
  status: string;
  logged_in: boolean;
  user?: {
    email: string;
  };
};

export default function Home(): JSX.Element {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/', {
          credentials: 'include',
        });
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('エラーが発生しました:', error);
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
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}

      {apiData?.logged_in ? (
        <div>
          <p>ようこそ、{apiData.user?.email}さん！</p>
          
            href="/profile"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              width: '100%',
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              marginBottom: '10px'
            }}
          >
            プロフィール
          </a>
          <button
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              width: '100%',
              cursor: 'pointer'
            }}
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            // ログイン処理
          }}>
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              ログイン
            </button>
          </form>
          <button
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Googleでログイン
          </button>
          <button
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            新規登録
          </button>
        </div>
      )}
    </div>
  );
}