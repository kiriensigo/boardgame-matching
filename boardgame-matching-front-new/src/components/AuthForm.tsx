"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

type FormData = {
  name: string
  email: string
  password: string
  favoriteGames: string[]
  ownedGames: string[]
  preferredGameType: string
  preferredGameTime: number
  bggUsername: string
  importFromBGG: boolean
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    toast({
      title: isLogin ? "ログインしました！" : "登録が完了しました！",
      description: "ボードバディーズへようこそ！",
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">{isLogin ? "ログイン" : "登録"}</h2>

      {!isLogin && (
        <div>
          <Label htmlFor="name">名前</Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <span className="text-red-500">この項目は必須です</span>}
        </div>
      )}

      <div>
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" type="email" {...register("email", { required: true })} />
        {errors.email && <span className="text-red-500">この項目は必須です</span>}
      </div>

      <div>
        <Label htmlFor="password">パスワード</Label>
        <Input id="password" type="password" {...register("password", { required: true })} />
        {errors.password && <span className="text-red-500">この項目は必須です</span>}
      </div>

      {!isLogin && (
        <>
          <div>
            <Label htmlFor="favoriteGames">好きなゲーム</Label>
            <Input id="favoriteGames" {...register("favoriteGames")} />
          </div>

          <div>
            <Label htmlFor="ownedGames">所持しているゲーム</Label>
            <Input id="ownedGames" {...register("ownedGames")} />
          </div>

          <div>
            <Label htmlFor="preferredGameType">好きなゲームタイプ</Label>
            <Select onValueChange={(value) => register("preferredGameType").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="ゲームタイプを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strategy">戦略</SelectItem>
                <SelectItem value="party">パーティー</SelectItem>
                <SelectItem value="card">カード</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredGameTime">希望するゲーム時間（分）</Label>
            <Input id="preferredGameTime" type="number" {...register("preferredGameTime", { min: 0 })} />
          </div>

          <div>
            <Label htmlFor="bggUsername">BGGユーザー名</Label>
            <Input id="bggUsername" {...register("bggUsername")} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="importFromBGG" {...register("importFromBGG")} />
            <Label htmlFor="importFromBGG">BGGからインポート</Label>
          </div>
        </>
      )}

      <Button type="submit">{isLogin ? "ログイン" : "登録"}</Button>
      <Button type="button" variant="outline" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "アカウントをお持ちでない方はこちら" : "すでにアカウントをお持ちの方はこちら"}
      </Button>
      <Button type="button" variant="outline">
        Googleでログイン
      </Button>
    </form>
  )
}

