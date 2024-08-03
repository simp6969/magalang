"use client";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import { PhotoStorageController } from "./PhotoStorageController";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function MainSolvingCards() {
  const [gameState, setGameState] = useState({
    paused: true,
    gameStarted: false,
    dataFromStorage: null,
    selectedCards: [],
    correctAnswers: [],
    selectedPath: [],
    currentSeconds: 0,
    MenuPaused: true,
  });
  const router = useRouter();
  const { user } = useUser();

  // Fetch card data on component mount
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      dataFromStorage: PhotoStorageController(),
    }));
  }, []);
  // Timer Management
  useEffect(() => {
    let intervalId;

    if (gameState.gameStarted) {
      intervalId = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          currentSeconds: prev.currentSeconds + 1,
        }));
      }, 1000);
    }

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [gameState.gameStarted]);

  // Handle game completion
  useEffect(() => {
    async function run() {
      if (gameState.correctAnswers.length === 12) {
        setGameState((prev) => ({
          ...prev,
          gameStarted: false,
        }));
        console.log("current seconds" + gameState.currentSeconds);
        if (user?.id) {
          await fetch("http://localhost:8000" + "/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname: user.firstName,
              lastname: user.lastName,
              userid: user.id,
              score: gameState.currentSeconds,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
        router.push("/score");
      }
    }
    run();
  }, [gameState.correctAnswers]);

  function handleHiddenImage(id, path) {
    setGameState((prev) => ({
      ...prev,
      selectedCards: [...prev.selectedCards, id],
      selectedPath: [...prev.selectedPath, path],
    }));

    if (gameState.selectedCards.length === 1) {
      if (
        gameState.selectedPath[0] === path &&
        gameState.selectedCards[0] !== id
      ) {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            correctAnswers: [...prev.correctAnswers, id, prev.selectedCards[0]],
            selectedCards: [],
            selectedPath: [],
          }));
        }, 300);
      } else {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            selectedCards: [],
            selectedPath: [],
          }));
        }, 300);
      }
    }
  }

  // Render the game
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <ClerkLoading>
        <div className="">loading</div>
      </ClerkLoading>
      <ClerkLoaded>
        <div
          className="absolute top-[10px] right-[20px] flex-row gap-[10px] text-[#3a2f31] justify-center items-center"
          style={{
            display: gameState?.MenuPaused ? "flex" : "none",
          }}
        >
          <div
            className="h-[45px] w-[45px] hover:cursor-pointer"
            title="settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={() => router.push("/settings")}
            >
              <path
                height={30}
                width={30}
                fill="#212121"
                d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
              />
            </svg>
          </div>
          {user ? <p></p> : <p>Guest</p>}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton className="text-[#3a2f31] font-semibold text-[18px] mr-[10px]" />
          </SignedOut>
        </div>
        <div
          style={
            gameState?.MenuPaused
              ? {
                  display: "flex",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: "2",
                  flexDirection: "column",
                  height: "100%",
                }
              : { display: "none" }
          }
          className="card-container "
        >
          <div className="flex justify-end h-[20px] w-[100%]"></div>
          <h1 className="text-[30px] font-semibold text-[#3a2f31]">
            Magalang Project
          </h1>
          <div className="flex gap-[10px]">
            <button
              title="Play"
              onClick={() => {
                setGameState((prev) => ({
                  ...prev,
                  MenuPaused: false,
                }));
                setTimeout(() => {
                  setGameState((prev) => ({
                    ...prev,
                    gameStarted: true,
                    paused: false,
                  }));
                }, 3000);
              }}
              className="primaryButton"
            >
              <p>play</p>
            </button>
            <button
              title="about"
              onClick={() => {
                router.push("/about");
              }}
              className="primaryButton"
            >
              <p>about</p>
            </button>
          </div>
        </div>
        <div
          className="card-container"
          style={
            gameState.MenuPaused
              ? { filter: "blur(50px)", position: "absolute", zIndex: "1" }
              : {}
          }
        >
          {gameState?.dataFromStorage?.map((e) => {
            return (
              <div
                className="responsiveCard"
                style={
                  !gameState.gameStarted ||
                  gameState.selectedCards.includes(e.id) ||
                  gameState.correctAnswers.includes(e.id)
                    ? { transform: "rotateY(0deg)" }
                    : { transform: "rotateY(180deg)" }
                }
                key={e.id}
              >
                <Image
                  src={"/cards/cardBack.jpg"}
                  alt="guess the photo"
                  className=" cardBack duration-[200ms]"
                  fill
                  priority
                  quality={90}
                  objectFit="cover"
                  draggable="false"
                  sizes="150px 260px"
                  onClick={() => {
                    handleHiddenImage(e.id, e.path);
                  }}
                />
                <Image
                  src={e.path}
                  alt="guess the photo"
                  className=" cardFront"
                  fill
                  priority
                  quality={90}
                  objectFit="cover"
                  draggable="false"
                  sizes="150px 260px"
                />
              </div>
            );
          })}
        </div>
      </ClerkLoaded>
    </div>
  );
}
