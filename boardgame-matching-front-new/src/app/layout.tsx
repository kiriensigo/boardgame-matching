import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ボードゲームマッチング",
  description: "ボードゲーム仲間を見つけよう",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header email={email || undefined} />
        <main className="min-h-screen bg-gray-50 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
