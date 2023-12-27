"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Data } from "../components/Data";
import { getCookie } from "cookies-next";
import { Validate } from "../components/ValidateUser";
import { EditPhoto } from "../components/EditPhoto";
import axios from "axios";

export default function App() {
  const [clickedPhoto, setClickedPhoto] = useState(null);
  const [preData, setPreData] = useState([]);
  const [baseData, setBaseData] = useState(() => {
    const unique = Data().filter(
      (obj, index) => index === Data().findIndex((o) => obj.path === o.path)
    );
    return unique;
  });
  const router = useRouter();

  const handleFile = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const base64String = await resizeAndConvertToBase64(file);
        setPreData([...preData, { originalPath: baseData[clickedPhoto].path }]);
        setBaseData((prevBaseData) => {
          const updatedData = [...prevBaseData];
          updatedData[clickedPhoto].path = base64String;
          return updatedData;
        });
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const resizeAndConvertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 350;
          const maxHeight = 400;

          let newWidth = img.width;
          let newHeight = img.height;

          if (img.width > maxWidth || img.height > maxHeight) {
            const aspectRatio = img.width / img.height;

            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = maxWidth / aspectRatio;
            }

            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = maxHeight * aspectRatio;
            }
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const newDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(newDataUrl);
        };
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    const customData = baseData.filter(
      (element) =>
        ![
          "/images/photo1.jpg",
          "/images/photo2.jpg",
          "/images/photo3.jpg",
          "/images/photo4.jpg",
          "/images/photo5.jpg",
          "/images/photo6.jpg",
        ].includes(element.path)
    );

    const urlFriendly = customData.map((element) =>
      element.path.replace(/-/g, "+").replace(/_/g, "/")
    );

    if (urlFriendly.length === 0) {
      console.log("No changes detected");
      return;
    }

    try {
      await Promise.all(
        urlFriendly.map(async (element, index) => {
          const response = await axios.post(
            "http://localhost:8080/user/photo",
            {
              base64: element,
              username: getCookie("sign"),
              ...preData[index],
            }
          );
          console.log(response.data);
        })
      );

      console.log("All images sent successfully");
      // router.push("/");
    } catch (error) {
      console.error("Error sending images:", error);
    }
  };

  const handleClick = (index) => {
    document.getElementById("input").click();
    setClickedPhoto(index);
  };

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center flex-col items-center gap-5">
      <h1>Editing Photo</h1>
      <Validate />
      <div className="flex flex-wrap gap-5 justify-center">
        {baseData.map((element, index) => (
          <div
            className="h-max w-[20%] flex rounded-lg border-2 border-white gap-[10px] sm:w-[14%]"
            key={index}
            onClick={() => handleClick(index)}
          >
            <EditPhoto src={element.path} />
          </div>
        ))}
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
        Save
      </button>
      <button
        onClick={() => router.push("/")}
        className="border-2 rounded-[10px] p-[10px] hover:bg-[#696969] transition-all duration-300"
      >
        Return Home
      </button>
    </div>
  );
}
