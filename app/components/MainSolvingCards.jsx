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
          className="absolute top-[10px] right-[10px] flex-row gap-[10px] text-[#3a2f31] justify-center items-center"
          style={{
            display: gameState?.MenuPaused ? "flex" : "none",
          }}
        >
          {user ? <p>Welcome {user.lastName}</p> : <p>Welcome Guest</p>}
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
