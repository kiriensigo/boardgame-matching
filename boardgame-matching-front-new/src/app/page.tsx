"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

interface Event {
  date: string;
  location: string;
  fee: number;
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/v1/events");
        setEvents(response.data);
      } catch (error) {
        console.error("イベントの取得に失敗しました", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-5xl font-bold text-center text-blue-700 mb-8">
          ボードゲーム仲間を見つけよう！
        </h1>
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-800">
            好きなボードゲームを通じて、新しい仲間と出会いましょう。
          </p>
          <p className="text-gray-700">
            プロフィールを設定して、マッチングを始めることができます。
          </p>
          <Link href="/profile">
            <Button className="mt-4">プロフィールを設定する</Button>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
            イベント一覧
          </h2>
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p>日時: {event.date}</p>
                <p>場所: {event.location}</p>
                <p>参加費用: {event.fee}円</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>© 2023 ボードゲームマッチング</p>
      </footer>
    </div>
  );
};

export default HomePage;
