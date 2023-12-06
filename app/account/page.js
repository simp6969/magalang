"use client";

import { getCookie, deleteCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function App() {
  const [userdata, setUserData] = useState([]);
  const router = useRouter();
  function get() {
    fetch("http://https://backend-one-lemon.vercel.app/users/highscore")
      .then((res) => res.json())
      .then((response) => setUserData(response.userData));
  }
  useEffect(() => {
    get();
  }, []);
  const filt = userdata.filter(
    (element) => element.username === getCookie("sign")
  );
  userdata.sort((s1, s2) => {
    return s1.highscore - s2.highscore;
  });

  if (userdata.length === 0) {
    return <div>loading....</div>;
  }
  return (
    <div className=" flex text-[25px] justify-center gap-[10px] items-center p-[20px] h-[100vh] w-[100vw] flex-col">
      <div className="max-[800px]:w-[90%] max-[800px]:h-[60%] w-[500px] backdrop-blur-xl h-[500px] flex flex-col gap-[10px] p-[20px] items-center rounded-[10px]">
        <h1>{filt[0].username}</h1>
        <h1>high score: {filt[0].highscore}</h1>
        <h1>global rank:</h1>
        <div className="flex justify-space gap-[13px] text-[16px] ">
          <h1>place</h1>
          <h1>username</h1>
          <h1>seconds</h1>
        </div>

        <div className="idk overflow-y-scroll max-[800px]:w-[120%] w-[500px] flex flex-col gap-[10px] p-[20px] items-center rounded-[10px]">
          {userdata.map((element, index) => {
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
      </div>
      <button
        className="absolute bottom-4 bg-[transparent] h-[auto] w-[auto] p-[10px] border-white border-2 rounded-md"
        onClick={() => router.push("/")}
      >
        Main Menu
      </button>
      <button
        className="absolute bottom-20 bg-[transparent] h-[auto] w-[auto] p-[10px] border-white border-2 rounded-md"
        onClick={() => {
          deleteCookie("sign");
          router.push("/");
        }}
      >
        log out
      </button>
    </div>
  );
}
