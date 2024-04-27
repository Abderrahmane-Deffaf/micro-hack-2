import { baseUrl } from "@/lib/helper";
import { cookies } from "next/headers";

export async function getUserServer() {
  const token = cookies().get("auth")?.value;
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
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}
