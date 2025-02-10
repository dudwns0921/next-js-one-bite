import style from "./page.module.css";
import BookItem from "@/app/components/BookItem/bookItem";
import fetchBooks from "@/app/lib/fetch-books";
import fetchRandomBooks from "@/app/lib/fetch-random-books";
import Head from "next/head";

export default async function Home() {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return (
    <>
      <Head>
        <title>한입 북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 북스" />
        <meta
          property="og:description"
          content="한입 북스의 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem {...book} key={book.id}></BookItem>
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem {...book} key={book.id}></BookItem>
          ))}
        </section>
      </div>
    </>
  );
}
