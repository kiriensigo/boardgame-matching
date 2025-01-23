"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type FormData = {
  title: string
  description: string
  date: string
  time: string
  location: string
}

export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    toast({
      title: "イベントが作成されました！",
      description: "イベントがリストに追加されました。",
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">イベント作成</h2>

      <div>
        <Label htmlFor="title">イベントタイトル</Label>
        <Input id="title" {...register("title", { required: true })} />
        {errors.title && <span className="text-red-500">この項目は必須です</span>}
      </div>

      <div>
        <Label htmlFor="description">説明</Label>
        <Textarea id="description" {...register("description", { required: true })} />
        {errors.description && <span className="text-red-500">この項目は必須です</span>}
      </div>

      <div>
        <Label htmlFor="date">日付</Label>
        <Input id="date" type="date" {...register("date", { required: true })} />
        {errors.date && <span className="text-red-500">この項目は必須です</span>}
      </div>

      <div>
        <Label htmlFor="time">時間</Label>
        <Input id="time" type="time" {...register("time", { required: true })} />
        {errors.time && <span className="text-red-500">この項目は必須です</span>}
      </div>

      <div>
        <Label htmlFor="location">場所</Label>
        <Input id="location" {...register("location", { required: true })} />
        {errors.location && <span className="text-red-500">この項目は必須です</span>}
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p>地図プレースホルダー: 地図上で場所を選択</p>
      </div>

      <Button type="submit">イベントを作成</Button>
    </form>
  )
}

