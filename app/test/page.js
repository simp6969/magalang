"use client";

import React, { useRef } from "react";

const ImageUploader = () => {
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const base64String = await resizeAndConvertToBase64(file);
      console.log(base64String);
    }
  };

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
          const maxWidth = 300;
          const maxHeight = 300;

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

          const newDataUrl = canvas.toDataURL("image/jpeg", 0.4); // You can adjust the quality

          resolve(newDataUrl);
        };
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input type="file" ref={inputRef} onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploader;
