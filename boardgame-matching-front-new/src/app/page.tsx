"use client";

import Header from "@/components/Header";
import React from "react";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
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
          <Button className="mt-4">プロフィールを設定する</Button>
        </div>
      </main>
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>© 2023 ボードゲームマッチング</p>
      </footer>
    </div>
  );
};

export default HomePage;
