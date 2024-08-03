"use client";

import { useEffect } from "react";
import { MainHeader } from "./components/MainHeader";
import { MainSolvingCards } from "./components/MainSolvingCards";

export default function Play() {
  useEffect(() => {
    localStorage.setItem(
      "theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
    let body = document.getElementsByTagName("body");
    body.item(0).classList.add(localStorage.getItem("theme"));
  }, []);
  return (
    <div className="w-[100vw] h-[100vh]">
      {/* <MainHeader /> */}
      <MainSolvingCards />
    </div>
  );
}
