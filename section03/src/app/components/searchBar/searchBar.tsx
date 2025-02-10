"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./searchBar.module.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("q")) {
      setSearch(searchParams.get("q") || "");
    }
  }, []);

  function handleClick() {
    router.push(`/search?q=${search}`);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className={style.searchbar_container}>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={onKeyDown}
      ></input>
      <button onClick={handleClick}>검색</button>
    </div>
  );
}
