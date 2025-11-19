"use client";

import { useEffect } from "react";
import { MainHeader } from "./components/MainHeader";
import { MainSolvingCards } from "./components/MainSolvingCards";

export default function Play() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <MainSolvingCards />
    </div>
  );
}
