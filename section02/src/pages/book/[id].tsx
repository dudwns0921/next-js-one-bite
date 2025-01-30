import { useRouter } from "next/router";
import { BookData } from "../api/books";
import { useEffect, useState } from "react";
import style from "./[id].module.css";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<BookData | null>(null);

  useEffect(() => {
    if (!id) return;

    const initialize = async () => {
      try {
        const response = await fetch("/api/books");
        const booksFromAPI = (await response.json()) as BookData[];

        const foundBook = booksFromAPI.find((book) => book.id === Number(id));
        setBook(foundBook ?? null);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    initialize();
  }, [id]);

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
