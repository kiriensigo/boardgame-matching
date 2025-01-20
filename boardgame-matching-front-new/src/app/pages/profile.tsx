import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfilePage = () => {
  // ユーザー情報を管理するための状態
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    favoriteGames: '',
    bio: ''
  });

  // フォームの入力値を更新する関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // プロフィール更新を処理する関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    // APIとの通信処理をここに実装
    console.log('Profile updated:', profile);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">プロフィール設定</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">ユーザー名</label>
              <Input
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full"
                placeholder="ユーザー名を入力"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">メールアドレス</label>
              <Input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full"
                placeholder="メールアドレスを入力"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">好きなボードゲーム</label>
              <Input
                name="favoriteGames"
                value={profile.favoriteGames}
                onChange={handleChange}
                className="w-full"
                placeholder="カタン、ドミニオンなど"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">自己紹介</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full h-32 rounded-md border border-gray-300 p-2"
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
};

export default ProfilePage;