import { getCookieValue } from "@/lib/constants";
import { baseUrl } from "@/lib/helper";

export async function getUser() {
  const token = getCookieValue();
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

export async function getUserRole() {
  const token = getCookieValue();
  console.log(token);
  if (token) {
    try {
      console.log(baseUrl);

      //
      const res = await fetch(`${baseUrl}/user-role`, {
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

export async function getRoles(id: string) {
  const token = getCookieValue();
  console.log(token);
  try {
    const response = await fetch(`${baseUrl}/role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    return null;
  }
}
