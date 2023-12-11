"use client";

import { useState } from "react";
import { Data } from "../components/Data";
import Image from "next/image";
export default function App() {
  const [BaseData, setBaseData] = useState();
  const uniqueMap = {};
  const data = Data.filter((element) => {
    const key = element.path; // Change this to the property you want to use as the key
    const isNew = !uniqueMap[key];
    if (isNew) {
      uniqueMap[key] = true;
    }
    return isNew;
  });
  const handleFile = (e) => {
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      setBaseData({ ...BaseData, srcData });
    };
    try {
      fileReader.readAsDataURL(e.target.files[0]);
    } catch {
      console.log("return by death");
    }
  };
  function handlePhoto(e) {
    setBaseData({ ...BaseData, click: true, id: e });
  }
  console.log(data);
  return (
    <div className="scroll flex justify-center items-center h-[100vh] w-[100vw] flex-wrap gap-[10px]">
      {data.map((element, index) => {
        return (
          <div
            className="relative w-[125px] h-[200px]"
            onClick={() => handlePhoto(index)}
            key={index}
          >
            <Image src={element.path} height={150} width={150} />
            <input
              style={
                BaseData?.click ? { display: "block" } : { display: "none" }
              }
              accept="image/*"
              type="file"
              onChange={handleFile}
            ></input>
            <Image
              style={
                BaseData?.srcData ? { display: "block" } : { display: "none" }
              }
              width={100}
              height={150}
              src={BaseData?.srcData}
            ></Image>
          </div>
        );
      })}
      {/* <input
        id="image"
        onChange={handleFile}
        type="file"
        accept="images"
      ></input>
      <label for="image">hello</label>*/}
    </div>
  );
}
