import BookItem from "@/app/components/BookItem/bookItem";
import searchBooks from "@/app/lib/search-books";
import Head from "next/head";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const booksSearched = await searchBooks((await searchParams).q);
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
