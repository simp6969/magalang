"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./style.css";

export function MainHeader() {
  return (
    <div className="header flex w-[100vw] justify-between items-center p-[15px]">
      <div className="flex ml-[40px] items-center gap-[60px]">
        <h1>Magalang</h1>
        <a href="/contact">Contact Me</a>
        <a href="/about">About</a>
      </div>
      <div className="flex items-center gap-[60px] mr-[40px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="black"
          height={30}
          width={30}
          alt="Menu icon"
        >
          <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
        </svg>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
