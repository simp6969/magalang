"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Finish() {
  const params = useSearchParams();
  const router = useRouter();
  const [sign, setSign] = useState();
  useEffect(() => {
    setSign(getCookie("sign"));
    fetch("https://backend-one-lemon.vercel.app/user/highscore", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: getCookie("sign"),
        highscore: params.get("time"),
      }),
    });
  }, []);

  return (
    <div className="outer flex justify-center items-center h-[100vh] w-[100vw]">
      {sign ? (
        <button
          onClick={() => {
            router.push("/account");
          }}
          className="absolute top-[8px] right-[16px] text-[25px] flex h-[50px] w-[100px] justify-center backdrop-blur-lg rounded-lg bg-[transparent] items-center hover:bg-[#696969] transition-all duration-300 border-[white] border-2"
        >
          {sign}
        </button>
      ) : (
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="absolute top-[8px] right-[16px] text-[25px] flex h-[50px] w-[100px] justify-center backdrop-blur-lg rounded-lg bg-[transparent] items-center hover:bg-[#696969] transition-all duration-300 border-[white] border-2"
        >
          login
        </button>
      )}
      <div className="backdrop-blur flex justify-center items-center h-[400px] w-[auto] flex-col gap-[20px] text-[25px] p-[20px] rounded-lg ">
        <h1>solving time: {params.get("time")} seconds</h1>
        <p>good job lol</p>
        <button
          className="border-2 border-white p-[10px] rounded-[10px] hover:bg-[#3d3d3d] transition-all duration-300"
          onClick={() => router.push("/")}
        >
          play again
        </button>
      </div>
    </div>
  );
}
