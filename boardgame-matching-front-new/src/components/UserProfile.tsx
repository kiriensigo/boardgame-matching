"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UserProfileData {
  name: string;
  email: string;
  bio: string;
  favoriteGames: string[];
  ownedGames: string[];
  preferredGameType: string;
  preferredGameTime: number;
  bggUsername: string;
}

export default function UserProfile() {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      try {
        const response = await fetch("http://localhost:3000/api/v1/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
            client: client || "",
            uid: uid || "",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("プロフィールの取得に失敗しました");
        }

        const profileData = await response.json();
        setUserData(profileData);
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // プロフィール更新のロジックを実装予定
    toast({
      title: "プロフィールを更新しました",
      description: "変更が保存されました。",
    });
  };

  if (!userData) {
    return <div>Loading...</div>; // データがまだ取得できていない場合の表示
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            名前
          </label>
          <input
            type="text"
            id="name"
            defaultValue={userData.name}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            defaultValue={userData.email}
            className="w-full p-2 border rounded-md"
            disabled
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            自己紹介
          </label>
          <textarea
            id="bio"
            defaultValue={userData.bio}
            className="w-full p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            好きなボードゲーム
          </label>
          <div className="flex flex-wrap gap-2">
            {userData.favoriteGames.map((game, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 rounded-full text-sm"
              >
                {game}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          プロフィールを更新
        </button>
      </form>
    </div>
  );
}
