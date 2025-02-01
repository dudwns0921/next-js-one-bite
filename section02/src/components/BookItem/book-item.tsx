import { BookData } from "@/types/book";
import Link from "next/link";
import style from "./book-item.module.css";

export default function BookItem({
  id,
  title,
  coverImgUrl,
  subTitle,
  author,
  publisher,
}: BookData) {
  return (
    <Link href={`book/${id}`} className={style.container}>
      <img src={coverImgUrl} alt="bookCover" />
      <div className={style.info_container}>
        <div className={style.title_container}>
          <div>{title}</div>
          <div>{subTitle}</div>
        </div>
        <div className={style.author_container}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
