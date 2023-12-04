"use client";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { CheckSign } from "./components/CheckSign";
export default function App() {
  const router = useRouter();
  const [sign, setSign] = useState();
  useEffect(() => {
    setSign(getCookie("sign"));
  }, []);
  const setPhotoCookie = setCookie("photo");
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] relative">
      <CheckSign sign={sign} />
      <div className="backdrop-blur h-[300px] w-[400px] flex justify-center items-center flex-col rounded-[10px] gap-[25px]">
        <h1 className="text-[30px]">Magalang Project</h1>
        <div className="flex gap-[10px]">
          <button
            onClick={() => {
              setPhotoCookie;
              router.push("/play");
            }}
            className="border-2 border-white px-[15px] rounded-[10px] py-[5px]  transition-all duration-300 hover:bg-[#3d3d3d]"
          >
            play
          </button>
        </div>

        <a onClick={() => router.push("/about")}>Credits</a>
      </div>
    </div>
  );
}
