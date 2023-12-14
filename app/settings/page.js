"use client";

import { useState } from "react";
import { Data } from "../components/Data";
import Image from "next/image";
import { setCookie } from "cookies-next";

export default function App() {
  const [clickedPhoto, setClickedPhoto] = useState();
  const [baseData, setBaseData] = useState(() => {
    const unique = Data.filter((obj, index) => {
      return index === Data.findIndex((o) => obj.path === o.path);
    });
    return unique;
  });
  function handleClick(id) {
    document.getElementById("input").click();
    setClickedPhoto(id);
  }
  function handleFile(event) {
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      const index = baseData.filter((element) => {
        if (element.id === clickedPhoto) {
          element.path = srcData;
          return element;
        }
      });
      const arr = [...baseData, index];
      arr.pop();
      setBaseData(arr);
    };
    try {
      fileReader.readAsDataURL(event.target.files[0]);
    } catch {
      console.log("return by death");
    }
  }
  function handleSave() {
    const customData = [
      {
        path:
          baseData[0].path === "/images/photo1.jpg"
            ? "/images/photo1.jpg"
            : baseData[0].path,
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path:
          baseData[1].path === "/images/photo2.jpg"
            ? "/images/photo2.jpg"
            : baseData[1].path,

        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path:
          baseData[2].path === "/images/photo3.jpg"
            ? "/images/photo3.jpg"
            : baseData[2].path,

        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path:
          baseData[3].path === "/images/photo4.jpg"
            ? "/images/photo4.jpg"
            : baseData[3].path,

        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path:
          baseData[4].path === "/images/photo5.jpg"
            ? "/images/photo5.jpg"
            : baseData[4].path,

        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path:
          baseData[5].path === "/images/photo6.jpg"
            ? "/images/photo6.jpg"
            : baseData[5].path,
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
    ];
    const urlFriendly = customData.map((element) => {
      return (
        element.path.replace(/\+/g, "-"),
        element.path.replace(/\//g, "_"),
        element.path.replace(/\=+$/, "")
      );
    });
    const size = new TextEncoder().encode(JSON.stringify(urlFriendly)).length;
    const kiloBytes = size / 1024;
    const megaBytes = kiloBytes / 1024;
    // const solution = urlFriendly.replace(/-/g, "+").replace(/_/g, "/");
    console.log("size ", megaBytes);
  }
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center flex-col items-center gap-5">
      <h1>editing photo</h1>
      <div className="flex gap-5">
        {baseData.map((element, index) => {
          return (
            <div
              className="flex h-[200px] w-[114px] rounded-lg border-2 border-white gap-[10px] "
              key={index}
            >
              <Image
                alt="phots"
                className="rounded-[10px]"
                width={110}
                height={140}
                src={element.path}
                onClick={() => handleClick(element.id)}
              ></Image>
            </div>
          );
        })}
        <input
          type="file"
          className="hidden"
          id="input"
          onChange={handleFile}
        ></input>
      </div>
      <button
        onClick={handleSave}
        className="border-2 rounded-[10px] p-[10px] hover:bg-[#696969] transition-all duration-300"
      >
        save
      </button>
    </div>
  );
}
