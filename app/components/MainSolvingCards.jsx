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
  const [mainPipeOfState, setMainStateOfPipe] = useState({
    paused: true,
    dataFromStorage: null,
    hideCards: false,
    selectedCards: [],
    correctAnswers: [],
    selectedPath: [],
  });
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setMainStateOfPipe({
      ...mainPipeOfState,
      dataFromStorage: PhotoStorageController(),
    });
  }, []);
  useEffect(() => {
    if (!mainPipeOfState.paused) {
      setTimeout(() => {
        setMainStateOfPipe({ ...mainPipeOfState, hideCards: true });
      }, 3000);
    }
  }, [mainPipeOfState.paused]);

  useEffect(() => {
    if (mainPipeOfState.correctAnswers.length === 12) {
      setTimeout(() => {
        router.push("/result");
      }, 3000);
    }
    [mainPipeOfState.correctAnswers];
  });

  function handleHiddenImage(id, path) {
    setMainStateOfPipe({
      ...mainPipeOfState,
      selectedCards: [...mainPipeOfState.selectedCards, id],
      selectedPath: [...mainPipeOfState.selectedPath, path],
    });

    if (mainPipeOfState.selectedCards.length === 1) {
      function equal() {
        if (
          mainPipeOfState.selectedPath[0] === path &&
          mainPipeOfState.selectedCards[0] !== id
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (equal()) {
        var timer1 = setTimeout(() => {
          setMainStateOfPipe({
            ...mainPipeOfState,
            correctAnswers: [
              ...mainPipeOfState.correctAnswers,
              id,
              mainPipeOfState.selectedCards[0],
            ],
            selectedCards: [],
            selectedPath: [],
          });
        }, 500);
      } else {
        var timer2 = setTimeout(() => {
          setMainStateOfPipe({
            ...mainPipeOfState,
            selectedCards: [],
            selectedPath: [],
          });
        }, 500);
      }
    }

    // if (mainPipeOfState.selectedCards.length == 0) {
    //   setMainStateOfPipe({
    //     ...mainPipeOfState,
    //     selectedCards: [...mainPipeOfState.selectedCards, id],
    //     selectedPath: [path, ...mainPipeOfState.selectedPath],
    //   });
    // }
    // if (mainPipeOfState.selectedCards.length == 1) {
    //   setTimeout(() => {
    //     if (mainPipeOfState.selectedPath[0] === path) {
    //       setMainStateOfPipe({
    //         ...mainPipeOfState,
    //         correctAnswers: [...mainPipeOfState.correctAnswers, path],
    //         selectedCards: [],
    //         selectedPath: [],
    //       });
    //     }
    //   }, 500);
    // } else {
    //   setMainStateOfPipe({
    //     ...mainPipeOfState,
    //     selectedCards: [],
    //     selectedPath: [],
    //   });
    // }
  }
  console.log(mainPipeOfState.correctAnswers.length);
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <ClerkLoading>
        <div className="">loading</div>
      </ClerkLoading>
      <ClerkLoaded>
        <div
          className="absolute top-[10px] right-[10px] flex-row gap-[10px] text-[#3a2f31] justify-center items-center"
          style={{
            display: mainPipeOfState?.paused ? "flex" : "none",
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
            mainPipeOfState?.paused
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
                setMainStateOfPipe({ ...mainPipeOfState, paused: false });
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
            mainPipeOfState.paused
              ? { filter: "blur(50px)", position: "absolute", zIndex: "1" }
              : {}
          }
        >
          {mainPipeOfState?.dataFromStorage?.map((e) => {
            return (
              <div
                className="responsiveCard"
                style={
                  mainPipeOfState.hideCards &&
                  !mainPipeOfState.selectedCards.includes(e.id) &&
                  !mainPipeOfState.correctAnswers.includes(e.id)
                    ? { transform: "rotateY(180deg)" }
                    : { transform: "rotateY(0deg)" }
                }
                key={e.id}
              >
                <Image
                  // style={
                  //   mainPipeOfState.hideCards &&
                  //   !mainPipeOfState.selectedCards.includes(e.id)
                  //     ? { transform: "rotateY(0deg)", transitionDelay: "100ms" }
                  //     : { transform: "rotateY(90deg)" }
                  // }
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
                  // style={handleImage()}
                  // style={
                  //   mainPipeOfState.hideCards &&
                  //   !mainPipeOfState.selectedCards.includes(e.id) &&
                  //   !mainPipeOfState.correctAnswers.includes(e.path)
                  //     ? { transform: "rotateY(90deg)" }
                  //     : {}
                  // }
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
