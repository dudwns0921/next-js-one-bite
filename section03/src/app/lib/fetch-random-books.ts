import { BookData } from "@/app/types/book";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `${process.env.NEXT_PUBLIC_BACK_END_URL}/book/random`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
