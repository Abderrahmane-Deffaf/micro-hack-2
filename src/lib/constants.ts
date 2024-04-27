export function getCookieValue() {
  const cookieString = document.cookie;
  const parts = cookieString.split("; ");
  for (let i = 0; i < parts.length; i++) {
    const [name, value] = parts[i].split("=");
    if (name === "auth") {
      console.log(value);

      return decodeURIComponent(value); // Decode the value
    }
  }
  return null; // Cookie not found
}

