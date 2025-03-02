"use client";

import { ReactNode, Suspense } from "react";
import SearchBar from "../components/searchBar/searchBar";
import style from "./globalLayout.module.css";
import HeaderComponent from "../components/Header/headerComponent";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={style.container}>
        <HeaderComponent />
        <Suspense>
          <SearchBar />
        </Suspense>
        <main className={style.main}>{children}</main>
        <footer className={style.footer}>제작 @Elio</footer>
      </body>
    </html>
  );
}
