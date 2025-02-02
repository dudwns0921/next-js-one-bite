import SearchableLayout from "@/components/SearchableLayout/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/BookItem/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import searchBooks from "@/lib/search-books";
import Head from "next/head";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const q = context.query.q as string;
    const booksSearched = await searchBooks(q);
    return {
      props: {
        booksSearched,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export default function Search({
  booksSearched,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>한입 북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스의 등록된 도서들을 만나보세요"
        />
      </Head>
      {booksSearched.map((book) => {
        return <BookItem {...book} key={book.id}></BookItem>;
      })}
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
