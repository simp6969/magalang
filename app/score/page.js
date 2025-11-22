"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Result() {
  const { user } = useUser();
  const [main, setMain] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get("score");

  useEffect(() => {
    fetch("https://backend-alpha-hazel-23.vercel.app/score")
      .then((res) => res.json())
      .then((data) => {
        setMain(data);
      });
  }, []);

  if (main.length == 0) {
    return (
      <div className="text-center w-[100vw] h-[100vh] align-center justify-center flex flex-col">
        loading...
      </div>
    );
  }
  return (
    <div className="flex text-[var(--ht-text)] justify-center items-center h-screen w-screen overflow-hidden flex-col gap-[20px]">
      <h1 className="font-bold text-[30px] text-[var(--ht-accent)]">
        LEADERBOARD
      </h1>
      
      {score && (
        <div className="bg-[var(--ht-accent)] text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          <p className="text-xl font-bold">
            Your Time: {score} seconds
          </p>
        </div>
      )}

      <div className="flex border-[2.5px] justify-center rounded-[10px] max-h-80 h-[40vh] p-[20px] gap-[20px] border-[#20151A] items-center flex-col bg-white/50 backdrop-blur-sm">
        <div className="flex flex-row gap-[20px] font-bold">
          <p>place</p>
          <p>lastname</p>
          <p>score(sec)</p>
        </div>
        <div className="w-[70%] border-b-[100%] border-black border-[1px] rounded-[10px]"></div>
        {main.map((e, index) => {
          return (
            <div key={index} className="flex w-[100%] justify-around">
              <p>{index + 1}</p>
              <p className="w-[50%] text-center">{e.lastname}</p>
              <p>{e.score} s</p>
            </div>
          );
        })}
      </div>
      <button className="primaryButton" onClick={() => router.push("/")}>
        <p>return</p>
      </button>
    </div>
  );
}
