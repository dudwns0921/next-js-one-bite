import SearchableLayout from "@/components/SearchableLayout/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import style from "./index.module.css";
import { BookData } from "./api/books";
import BookItem from "@/components/BookItem/book-item";
export default function Home() {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const booksFromAPI = await (await fetch("/api/books")).json();
        setBooks(booksFromAPI);
      } catch (error) {
        console.error(error);
      }
    };
    initialize();
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem {...book} key={book.id}></BookItem>
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem {...book} key={book.id}></BookItem>
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
