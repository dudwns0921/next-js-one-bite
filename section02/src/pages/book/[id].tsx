import style from "./[id].module.css";
import fetchBook from "@/lib/fetch-book";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

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
  if (book === null) {
    return <div>책 정보가 없습니다.</div>;
  }
  return (
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
  );
}
