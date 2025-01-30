"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">プロフィール設定</h1>

      <div className="bg-card shadow-md rounded-lg p-6">
        <form className="space-y-6">
          {/* 基本情報 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">ニックネーム</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="ニックネームを入力"
                />
              </div>

              <div>
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="自己紹介を入力"
                />
              </div>
            </div>
          </div>

          {/* ボードゲーム情報 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">ボードゲーム情報</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">ボードゲーム歴</Label>
                <Select name="experience">
                  <SelectTrigger>
                    <SelectValue placeholder="経験年数を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">初心者（1年未満）</SelectItem>
                    <SelectItem value="intermediate">
                      中級者（1-3年）
                    </SelectItem>
                    <SelectItem value="advanced">上級者（3年以上）</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>好きなボードゲーム（複数選択可）</Label>
                <div className="space-y-2 mt-2">
                  {[
                    "カタン",
                    "チケットトゥライド",
                    "パンデミック",
                    "カルカソンヌ",
                  ].map((game) => (
                    <div key={game} className="flex items-center space-x-2">
                      <Checkbox id={game} />
                      <Label htmlFor={game}>{game}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 希望する活動 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">希望する活動</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="offline-meetup" />
                <Label htmlFor="offline-meetup">オフライン交流会</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="online-meetup" />
                <Label htmlFor="online-meetup">オンライン交流会</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              キャンセル
            </Button>
            <Button type="submit">保存する</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
