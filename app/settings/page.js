"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Data } from "../components/Data";
import { getCookie } from "cookies-next";
import { Validate } from "../components/ValidateUser";
import { EditPhoto } from "../components/EditPhoto";
import axios from "axios";

export default function App() {
  const [clickedPhoto, setClickedPhoto] = useState();
  const [preData, setPreData] = useState([]);
  const [baseData, setBaseData] = useState(() => {
    const unique = Data().filter((obj, index) => {
      return index === Data().findIndex((o) => obj.path === o.path);
    });
    return unique;
  });
  const router = useRouter();
  function handleClick(id) {
    document.getElementById("input").click();
    setClickedPhoto(id);
  }

  //edit
  async function handleFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.append("file", file));
    axios
      .post("http://localhost:8080/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // const file = event.target.files[0];

    // if (file) {
    //   const base64String = await resizeAndConvertToBase64(file);
    //   const index = baseData.map((element) => {
    //     if (element.id === clickedPhoto) {
    //       setPreData([...preData, { originalPath: element.path }]);
    //       element.path = base64String;
    //       return element;
    //     }
    //   });
    //   const arr = [...baseData, index];
    //   arr.pop();
    //   setBaseData(arr);
    // }
  }
  const resizeAndConvertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // You can set the desired width and height here
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

          const newDataUrl = canvas.toDataURL("image/jpeg", 0.7); // en john sevte2

          resolve(newDataUrl);
        };
      };

      reader.readAsDataURL(file);
    });
  };
  //edit
  function handleSave() {
    const customData = baseData.filter((element) => {
      if (
        element.path === "/images/photo1.jpg" ||
        element.path === "/images/photo2.jpg" ||
        element.path === "/images/photo3.jpg" ||
        element.path === "/images/photo4.jpg" ||
        element.path === "/images/photo5.jpg" ||
        element.path === "/images/photo6.jpg"
      ) {
      } else {
        return element;
      }
    });
    const urlFriendly = customData.map((element) => {
      return element.path.replace(/-/g, "+").replace(/_/g, "/");
    });
    if (urlFriendly.length === 0) {
      console.log("no changes detected");
    }
    urlFriendly.map(async (element, index) => {
      // await fetch("https://backend-one-lemon.vercel.app/user/photo", {
      await fetch("http://localhost:8080/user/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64: element,
          username: getCookie("sign"),
          ...preData[index],
        }),
      })
        .then((res) => res.json())
        .then(
          (element) => console.log(element),
          console.log("sent"),
          router.push("/")
        )
        .catch((err) => console.log(err));
    });
  }
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center flex-col items-center gap-5">
      <h1>editing photo</h1>
      <Validate />
      <div className="flex flex-wrap gap-5 justify-center">
        {baseData.map((element, index) => {
          return (
            <div
              className=" h-max w-[20%] flex rounded-lg border-2 border-white gap-[10px] sm:w-[14%]"
              key={index}
              onClick={() => handleClick(element.id)}
            >
              <EditPhoto src={element.path} />
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
      <button
        onClick={() => router.push("/")}
        className="border-2 rounded-[10px] p-[10px] hover:bg-[#696969] transition-all duration-300"
      >
        return home
      </button>
    </div>
  );
}
