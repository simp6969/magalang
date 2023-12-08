"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Finish() {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    setData({ ...data, sign: getCookie("sign") });
    if (getCookie("sign")) {
      fetch("https://backend-one-lemon.vercel.app/user/highscore", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          username: getCookie("sign"),
          highscore: params.get("time"),
        }),
      });
    }
    fetch("https://backend-one-lemon.vercel.app/users/highscore")
      .then((res) => res.json())
      .then((response) => setData({ ...data, rank: response.userData }));
  }, []);
  return (
    <div className="outer flex justify-center items-center h-[100vh] w-[100vw]">
      {data?.sign ? (
        <button
          onClick={() => {
            router.push("/account");
          }}
          className="absolute top-[8px] right-[16px] text-[25px] flex h-[50px] w-[100px] justify-center backdrop-blur-lg rounded-lg bg-[transparent] items-center hover:bg-[#696969] transition-all duration-300 border-[white] border-2"
        >
          {data.sign}
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
      <div className="backdrop-blur flex justify-center items-center h-[700px] w-[auto] flex-col gap-[20px] text-[25px] p-[20px] rounded-lg ">
        <h1>solving time: {params.get("time")} seconds</h1>
        <p>good job lol</p>

        <h1>global rank:</h1>
        <div className="flex justify-space gap-[13px] text-[16px] ">
          <h1>place</h1>
          <h1>username</h1>
          <h1>seconds</h1>
        </div>

        <div className="idk overflow-y-scroll max-[800px]:w-[120%] w-[500px] flex flex-col gap-[10px] p-[20px] items-center rounded-[10px]">
          {data?.rank?.map((element, index) => {
            return (
              <div
                key={index}
                className="border-2 border-white max-[800px]:w-[90%] w-[60%] p-[20px] rounded-[10px] h-[80px] flex justify-between"
              >
                <h1>{index + 1}</h1>
                <h1> {element.username}</h1>
                <h1> {element.highscore}</h1>
              </div>
            );
          })}
        </div>
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
