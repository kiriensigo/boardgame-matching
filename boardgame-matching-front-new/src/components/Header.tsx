"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  email?: string;
}

export function Header({ email: initialEmail }: HeaderProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // クライアントサイドでのみlocalStorageにアクセス
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token") || "",
          client: localStorage.getItem("client") || "",
          uid: localStorage.getItem("uid") || "",
        },
      });

      if (response.ok) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("access-token");
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ボードゲームマッチング
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {email ? (
              <>
                <span className="text-sm text-gray-600">
                  ようこそ、{email}さん！
                </span>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    プロフィール
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ログアウト
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ログイン
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    新規登録
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
