"use client";

import { useState } from "react";
import { Data } from "../components/Data";
import Image from "next/image";
export default function App() {
  const uniqueMap = {};
  const [data, setData] = useState(
    Data.filter((element) => {
      const key = element.path;
      const isNew = !uniqueMap[key];
      if (isNew) {
        uniqueMap[key] = true;
      }
      return isNew;
    })
  );
  const handleFile = (e) => {
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      setData([{ ...data, srcData }]);
      console.log([...data]);
    };
    try {
      fileReader.readAsDataURL(e.target.files[0]);
    } catch {
      console.log("return by death");
    }
  };

  return (
    <div className="overflow-auto  flex justify-center items-center h-[100vh] w-[100vw] flex-wrap gap-[10px]">
      {data.map((element, index) => {
        return (
          <div className="flex flex-col gap-5" key={index}>
            {element?.srcData ? (
              <Image
                alt="photo"
                width={120}
                height={170}
                src={element?.srcData}
              ></Image>
            ) : (
              <Image
                onClick={() => document.getElementById("getFile").click()}
                alt="photo"
                src={element.path}
                height={190}
                width={160}
              />
            )}

            <button onClick={() => document.getElementById("getFile").click()}>
              change photo
            </button>
            <input
              accept="image/*"
              onChange={handleFile}
              type="file"
              id="getFile"
              style={{ display: "none" }}
            ></input>
          </div>
        );
      })}
    </div>
  );
}
