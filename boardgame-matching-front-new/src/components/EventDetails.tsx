"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"

type Participant = {
  id: number
  name: string
}

type EventData = {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: Participant[]
}

const mockEvent: EventData = {
  id: 1,
  title: "カタンナイト",
  description: "戦略的で楽しいカタンの夜に参加しましょう！",
  date: "2023-07-15",
  time: "19:00",
  location: "ボードゲームカフェ",
  participants: [
    { id: 1, name: "山田太郎" },
    { id: 2, name: "佐藤花子" },
    { id: 3, name: "鈴木一郎" },
  ],
}

export default function EventDetails() {
  const [event] = useState<EventData>(mockEvent)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>
            {event.date} at {event.time}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <strong>説明:</strong> {event.description}
          </p>
          <p>
            <strong>場所:</strong> {event.location}
          </p>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold mt-4">参加者</h3>
      <Card>
        <CardContent>
          <ul>
            {event.participants.map((participant) => (
              <li key={participant.id}>
                <Link href={`/profile/${participant.id}`} className="text-primary hover:underline">
                  {participant.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button>イベントに参加</Button>
    </div>
  )
}

