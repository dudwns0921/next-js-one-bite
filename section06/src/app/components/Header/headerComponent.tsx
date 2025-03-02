import Link from "next/link";
import style from "./headerComponent.module.css";

export default function HeaderComponent() {
  return (
    <header className={style.header}>
      <Link href={"/"}>ONEBITE BOOKS</Link>
    </header>
  );
}
