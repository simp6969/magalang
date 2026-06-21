"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function MainHeader() {
  return (
    <div className="flex w-screen justify-between items-center p-4">
      <div className="flex ml-10 items-center gap-14">
        <h1 className="text-2xl font-bold">Magalang</h1>
        <a href="/about">About</a>
      </div>
      <div className="flex items-center gap-14 mr-10">
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
