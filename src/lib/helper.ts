export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export async function checkToken(token: string | undefined) {
  console.log(token);

  if (token) {
    try {
      //
      const res = await fetch(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);

      return data[0]?.Is_Active;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}