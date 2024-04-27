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

export async function   getUserRole(id:string) {
  const token = getCookieValue();
  console.log(id);

  console.log(token);
  if (token) {
    try {
      console.log(baseUrl);

      //
      const res = await fetch(`${baseUrl}/role/${id}`, {
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
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function uploadDocument(file: File) {
  console.log(file);

  const token = getCookieValue();
  console.log(token);
  const formData = new FormData();
  formData.append("files", file, file?.name);
  try {
    const response = await fetch(`${baseUrl}/document/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDocumentText(id: string) {
  console.log(id);

  const token = getCookieValue();
  console.log(token);
  try {
    const response = await fetch(`${baseUrl}/document/one/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getActualText(pathText: string) {

  const token = getCookieValue();
  console.log(token);
  try {
    const response = await fetch(`${baseUrl}${pathText}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.text();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
