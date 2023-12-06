"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";

export default function App() {
  const [data, setData] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (getCookie("sign")) {
      router.push("/play?username=" + getCookie("sign"));
    }
  }, []);
  function handleLastName(event) {
    setData({ ...data, lastname: event.target.value });
  }
  function handleFirstName(event) {
    setData({ ...data, firstname: event.target.value });
  }
  function handleUserName(event) {
    setData({ ...data, username: event.target.value });
  }
  function handlePassword(event) {
    setData({ ...data, password: event.target.value });
  }
  function handleSubmit() {
    if (data.username === undefined || data.username === "") {
      console.log("username requered");
    } else if (data.firstname === undefined || data.firstname === "") {
      console.log("firstname requered");
    } else if (data.password === undefined || data.password === "") {
      console.log("password requered");
    } else if (data.lastname === undefined || data.lastname === "") {
      console.log("lastname requered");
    } else {
      fetch("http://localhost:8080/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => console.log(response));
      setCookie("sign", data.username);
      router.push("/play?username=" + data.username);
    }
  }
  // h-[40%] max-[400px]:w-[100%] w-[30%] p-[50px] flex justify-center px-[20px] items-center rounded-[30px] flex-col gap-[15px]
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] ">
      <div className="backdrop-blur-lg flex flex-col gap-[25px] w-[90%] h-[60%] justify-center min-[500px]:w-[400px] min-[500px]:h-[50%] items-center rounded-[30px]">
        <h1 className="text-[25px]">Create Account</h1>
        <input
          spellCheck={false}
          onChange={handleLastName}
          className="bg-[transparent] px-[10px] py-[5px] border-white border-2 rounded-md "
          placeholder="lastname"
        />
        <input
          spellCheck={false}
          onChange={handleFirstName}
          className="bg-[transparent] px-[10px] py-[5px] border-white border-2 rounded-md "
          placeholder="first name"
        />
        <input
          spellCheck={false}
          onChange={handleUserName}
          className="bg-[transparent] px-[10px] py-[5px] border-white border-2 rounded-md "
          placeholder="username"
        />
        <input
          spellCheck={false}
          onChange={handlePassword}
          className="bg-[transparent] px-[10px] py-[5px] border-white border-2 rounded-md "
          placeholder="password"
        />
        <button
          onClick={handleSubmit}
          className="bg-[transparent] h-[40px] w-[80px] border-white border-2 rounded-md"
        >
          submit
        </button>
        <button
          onClick={() => {
            router.push("/login");
          }}
        >
          or login
        </button>
      </div>
    </div>
  );
}
