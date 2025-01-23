"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
}

const mockEvents: Event[] = [
  { id: 1, title: "カタンナイト", date: "2023-07-15", time: "19:00", location: "ボードゲームカフェ" },
  { id: 2, title: "パンデミックレガシー", date: "2023-07-20", time: "18:30", location: "ジョンの家" },
  {
    id: 3,
    title: "チケットトゥライドトーナメント",
    date: "2023-07-25",
    time: "14:00",
    location: "コミュニティセンター",
  },
]

export default function EventList() {
  const [events] = useState<Event[]>(mockEvents)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">開催予定のイベント</h2>
      <div className="bg-muted p-4 rounded-md mb-4">
        <p>地図プレースホルダー: イベントが地図上にピンで表示されます</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>
                {event.date} at {event.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Location: {event.location}</p>
            </CardContent>
            <CardFooter>
              <Button>イベントに参加</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

