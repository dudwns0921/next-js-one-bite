import SearchableLayout from "@/components/SearchableLayout/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import BookItem from "@/components/BookItem/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  try {
    const [allBooks, recoBooks] = await Promise.all([
      fetchBooks(),
      fetchRandomBooks(),
    ]);

    return {
      props: {
        allBooks,
        recoBooks,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
