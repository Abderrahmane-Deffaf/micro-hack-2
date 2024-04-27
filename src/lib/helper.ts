export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const baseUrlAi = process.env.NEXT_PUBLIC_BASE_URL_AI;

export async function checkToken(token: string | undefined) {
  console.log(token);
  if (token) {
    try {
      console.log(baseUrl);

      //
      const res = await fetch(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data?.error) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}
