export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/users/sign_in", {
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

    return await response.json();
  } catch (error) {
    console.error("ログインエラー:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch("http://localhost:3000/users/sign_out", {
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
