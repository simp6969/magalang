"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";
import { useUser } from "@clerk/nextjs";

export default function Result() {
  const { user } = useUser();
  const [main, setMain] = useState([]);
  const router = useRouter();

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
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden flex-col gap-[20px]">
      <h1 className="font-bold text-[30px]">leaderboard</h1>
      <div className="flex border-[2.5px] justify-center rounded-[10px] max-h-80 h-[40vh] p-[20px] gap-[20px] border-[#20151A] items-center flex-col">
        <div className="flex flex-row gap-[20px]">
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
              <p>{e.score}</p>
            </div>
          );
        })}
      </div>
      <button className="button-16" onClick={() => router.push("/")}>
        <p>main menu</p>
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>
    </div>
  );
}
