import { cookies } from "next/headers";

export async function getData(query: string, revalidateTime: number) {
  const api = process.env.NEXT_PUBLIC_API || "https://nextshopapi.chill-hub.ir";
  const cookie = cookies().get("userInfo");
  const token = cookie ? JSON.parse(cookie.value).token : "";
  const res = await fetch(`${api}${query}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Access the token from cookies
    },
    next: { revalidate: revalidateTime },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error(res);
    throw new Error("مشکل سرور");
  }

  return res.json();
}
