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
    dataFromStorage: [],
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

    if (gameState.paused && gameState.dataFromStorage.length == 12) {
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
          await fetch("https://backend-alpha-hazel-23.vercel.app" + "/score", {
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
  console.log(gameState);
  // Render the game
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center flex-col gap-[30px] max-sm:gap-[10px]">
      <ClerkLoading>
        <div className="">loading...</div>
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
          ></div>
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
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: "2",
                  flexDirection: "column",
                  height: "40px",
                }
              : { height: "40px", opacity: "0" }
          }
        >
          <h1 className="text-[45px] max-sm:text-[35px] font-bold text-[var(--ht-accent)]">
            Magalang
          </h1>
        </div>
        <div className="card-container max-sm:w-[auto] max-md:w-[700px] max-lg:w-[800px] w-[1000px]">
          {gameState?.dataFromStorage?.map((e) => {
            return (
              <div
                className="responsiveCard"
                style={
                  !gameState.gameStarted &&
                  !gameState.selectedCards.includes(e.id) &&
                  !gameState.correctAnswers.includes(e.id)
                    ? { transform: "rotateY(180deg)" }
                    : { transform: "rotateY(0deg)" }
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
                    if (gameState.MenuPaused) return;
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
        <div className={gameState.MenuPaused ? "flex gap-[10px]" : "opacity-0"}>
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
                  gameStarted: false,
                  paused: true,
                }));
              }, 3000);
              setGameState((prev) => ({
                ...prev,
                gameStarted: true,
                paused: false,
              }));
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
      </ClerkLoaded>
    </div>
  );
}
