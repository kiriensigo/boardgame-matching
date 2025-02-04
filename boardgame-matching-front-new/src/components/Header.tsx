"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import axios from "axios";

export default function Header() {
  const { setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await axios.delete("/api/v1/auth/sign_out", {
        headers: {
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
        },
      });
      // ログアウト成功時の処理
      window.location.href = "/login";
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          ボードバディーズ
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-primary">
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/create-event"
                className="text-foreground hover:text-primary"
              >
                イベント作成
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-foreground hover:text-primary"
              >
                プロフィール
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={handleLogout}
                className="text-foreground hover:text-primary"
              >
                ログアウト
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Googleでログイン</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                ライト
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                ダーク
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                システム
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
