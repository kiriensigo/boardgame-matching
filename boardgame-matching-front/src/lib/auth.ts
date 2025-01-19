export async function login(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          user: {
            email,
            password
          }
        })
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'ログインに失敗しました');
      }
  
      return data;
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  }