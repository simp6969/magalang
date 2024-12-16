"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";
import { useUser } from "@clerk/nextjs";

export default function Result() {
  const { user } = useUser();
  const [main, setMain] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/score")
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
    </div>
  );
}
