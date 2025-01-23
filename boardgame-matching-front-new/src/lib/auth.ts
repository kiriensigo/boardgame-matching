// boardgame-matching-front-new/src/lib/auth.ts

export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("ログインに失敗しました");
    }

    const data = await response.json();

    // トークンをローカルストレージに保存
    localStorage.setItem(
      "access-token",
      response.headers.get("access-token") || ""
    );
    localStorage.setItem("client", response.headers.get("client") || "");
    localStorage.setItem("uid", response.headers.get("uid") || "");

    return data;
  } catch (error) {
    console.error("ログインエラー:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/sign_out", {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("ログアウトに失敗しました");
    }

    return await response.json();
  } catch (error) {
    console.error("ログアウトエラー:", error);
    throw error;
  }
}
