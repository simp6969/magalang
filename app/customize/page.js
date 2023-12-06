"use client";

import { useState } from "react";

export default function App() {
  const [image, setImage] = useState();
  function handleChange(event) {
    setImage(event.target.value);
  }

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center">
      <input type="file" onChange={handleChange} accept="image/*" />
      {image ? <img src={image}></img> : null}
    </div>
  );
}
