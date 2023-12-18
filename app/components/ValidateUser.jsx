"use client";

import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Validate() {
  const router = useRouter();
  if (getCookie("sign")) {
    axios
      .get("https://backend-one-lemon.vercel.app/user/" + getCookie("sign"))
      .then((elem) => {
        if (elem.data.length === 0) {
          deleteCookie("sign");
          router.push("/");
        } else {
          console.log("user is valid");
        }
      });
  }
  return <div></div>;
}
