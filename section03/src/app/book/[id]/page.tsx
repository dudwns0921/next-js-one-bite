import fetchBook from "@/app/lib/fetch-book";
import Head from "next/head";
import style from "./[id].module.css";
import fetchBooks from "@/app/lib/fetch-books";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await fetchBook(Number(id));

  if (book === null) {
    return <div>책 정보가 없습니다.</div>;
  }

  return (
    <>
      <Head>
        <title>{book.title}</title>
        <meta property="og:image" content={book.coverImgUrl} />
        <meta property="og:title" content={book.title} />
        <meta property="og:description" content={book.description} />
      </Head>
      <div>
        <div
          style={{
            backgroundImage: `url('${book?.coverImgUrl}')`,
          }}
          className={style.cover_img_container}
        >
          <img src={book?.coverImgUrl} />
        </div>
        <div className={style.info_container}>
          <div className={style.title}>{book?.title}</div>
          <div className={style.sub_title}>{book?.subTitle}</div>
          <div className={style.author}>
            {book?.author} | {book?.publisher}
          </div>
          <div className={style.description}>{book?.description}</div>
        </div>
      </div>
    </>
  );
}
