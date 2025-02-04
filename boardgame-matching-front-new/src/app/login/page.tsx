"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

export default function LoginPage() {
  const router = useRouter();
  const { setEmail } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/sign_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        setEmail(formData.email); // コンテキストの状態を更新
        router.push("/"); // ログイン成功後にリダイレクト
      } else {
        const errorData = await response.json();
        setError("ログインに失敗しました。");
      }
    } catch (error) {
      setError("サーバーとの通信に失敗しました。");
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
    <>
      <Header />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
    </>
  );
}
