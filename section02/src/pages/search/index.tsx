import SearchableLayout from "@/components/SearchableLayout/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { BookData } from "../api/books";
import BookItem from "@/components/BookItem/book-item";

export default function Search() {
  const router = useRouter();

  const q = router.query.q as string;

  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    if (!q) return;
    const initialize = async () => {
      try {
        const response = await fetch("/api/books");
        const booksFromAPI = (await response.json()) as BookData[];

        const booksFiltered = booksFromAPI.filter((book) =>
          book.title.includes(q)
        );

        setBooks(booksFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    initialize();
  }, [q]);

  return (
    <>
      {books.map((book) => {
        return <BookItem {...book} key={book.id}></BookItem>;
      })}
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
