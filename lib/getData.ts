export async function getData(query: string, revalidateTime: number) {
  const api = process.env.NEXT_PUBLIC_API || "https://nextshopapi.chill-hub.ir";
  const res = await fetch(`${api}${query}`, {
    next: { revalidate: revalidateTime },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("مشکل سرور");
  }

  return res.json();
}
