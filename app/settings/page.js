"use client";

import { useState } from "react";

export default function App() {
  const [img, setImg] = useState();

  const handleFile = (e) => {
    // getBase64Image(e.target.files[0]);
    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      setImg(srcData);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <input onChange={handleFile} type="file" accept="image/png"></input>
      <img height={80} width={80} src={img} />
    </div>
  );
}
