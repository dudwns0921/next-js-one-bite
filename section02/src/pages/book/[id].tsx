import style from "./[id].module.css";
import fetchBook from "@/lib/fetch-book";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const id = context.params!.id;
    const book = await fetchBook(Number(id));

    return {
      props: {
        book,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  if (router.isFallback) {
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
        <div>로딩중...</div>;
      </>
    );
  }
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
