"use client";

import { useState } from "react";
import { Data } from "../components/Data";
import Image from "next/image";

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
    console.log(event);
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      console.log(srcData);
      const index = baseData.filter((element) => {
        if (element.id === clickedPhoto) {
          element.path = srcData;
          return element;
        }
      });
    };
    try {
      fileReader.readAsDataURL(event.target.files[0]);
    } catch {
      console.log("return by death");
    }
  }
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center flex-col items-center">
      <h1>editing photo</h1>
      <div className="flex">
        {baseData.map((element, index) => {
          return (
            <div className="h-[300px] gap-[10px] p-[5px] flex" key={index}>
              <Image
                alt="phots"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto"
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
    </div>
  );
}
