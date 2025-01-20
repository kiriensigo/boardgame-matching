"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // アクセストークンをlocalStorageに保存
        localStorage.setItem("userEmail", formData.email);
        // ヘッダーからトークンを取得して保存
        const accessToken = response.headers.get("access-token");
        const client = response.headers.get("client");
        const uid = response.headers.get("uid");

        if (accessToken && client && uid) {
          localStorage.setItem("access-token", accessToken);
          localStorage.setItem("client", client);
          localStorage.setItem("uid", uid);
        }

        router.push("/");
      } else {
        setError("メールアドレスまたはパスワードが正しくありません");
      }
    } catch (error) {
      setError("ログインに失敗しました");
      console.error("Login error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">ログイン</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              ログイン
            </Button>

            <div className="text-center text-sm text-gray-600">
              アカウントをお持ちでない方は
              <Link href="/signup" className="text-blue-500 hover:underline">
                新規登録
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
