"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    favoriteGames: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("プロフィールの更新に失敗しました");
      }

      alert("プロフィールを更新しました！");
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">プロフィール設定</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">ユーザー名</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="ユーザー名を入力"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="メールアドレスを入力"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                好きなボードゲーム
              </label>
              <input
                type="text"
                name="favoriteGames"
                value={profile.favoriteGames}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="カタン、ドミニオンなど"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">自己紹介</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full h-32 p-2 border rounded-md"
                placeholder="自己紹介を入力してください"
              />
            </div>

            <Button type="submit" className="w-full">
              プロフィールを更新
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
