import SearchableLayout from "@/components/SearchableLayout/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/BookItem/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import searchBooks from "@/lib/search-books";

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
      {booksSearched.map((book) => {
        return <BookItem {...book} key={book.id}></BookItem>;
      })}
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
