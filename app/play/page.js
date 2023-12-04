"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { setCookie, getCookie } from "cookies-next";
import { CheckSign } from "../components/CheckSign";

//function importln
export default function App() {
  //usestates

  const router = useRouter();
  const [property, setProperty] = useState(
    shuffleArray([
      {
        path: "/images/photo1.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo2.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo3.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo4.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo5.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo6.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo1.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo2.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo3.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo4.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo5.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
      {
        path: "/images/photo6.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
    ])
  );
  const [click, setClick] = useState(1);
  const [fisrtClick, setFirstClick] = useState();
  const [moves, setMoves] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [sign, setSign] = useState();
  const [solvedCards, setSolvedCards] = useState(0);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  function handleCardClick(id, path, solved) {
    setClick(click + 1);
    setMoves(moves + 1);

    const updatedProperty = property.map((card) => {
      if (card.id === id) {
        return { ...card, clicked: true };
      }
      return card;
    });

    setProperty(updatedProperty);

    if (click === 1) {
      setFirstClick({ id, path, solved });
      if (solved) {
        console.log("thts solved card");
        setClick(1);
        return { id: id, path: path, solved: true, clicked: true };
      }
    } else if (click === 2) {
      setClick(1);
      //what in the holy world is this mess
      if (fisrtClick.path === path && fisrtClick.id !== id) {
        const updatedProperty = property.map((card) => {
          if (card.id === id || card.id === fisrtClick.id) {
            return { ...card, clicked: true, solved: true };
          }
          return card;
        });
        setProperty(updatedProperty);
        setSolvedCards(solvedCards + 1);
      } else {
        setTimeout(() => {
          const updatedProperty = property.map((card) => {
            if (card.id === id || card.id === fisrtClick.id) {
              return { ...card, clicked: false };
            }
            return card;
          });
          setProperty(updatedProperty);
        }, 500);
      }
    }
  }
  function restart() {
    router.push("/");
  }
  let seconds = 0;

  function pollDOM() {
    seconds++;

    if (seconds === 3) {
      const updatedProperty = property.map((card) => {
        return { ...card, clicked: false };
      });
      setProperty(updatedProperty);
      let displayTime = 0;
      function handleTimer() {
        displayTime++;
        setDisplayTime(displayTime);
      }
      const timer = setInterval(handleTimer, 1000);
    }
  }

  useEffect(() => {
    const interval = setInterval(pollDOM, 1000);
    setSign(getCookie("sign"));
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (solvedCards === 6) {
    router.push("/doneSolve?time=" + displayTime);
  }

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center gap-[10px]">
      <CheckSign sign={sign} />
      <div className="p-[10px] flex flex-col h-[auto] w-[auto]  text-[white] gap-[10px] justify-center items-center backdrop-blur">
        <h2 className="text-[30px]">time: {displayTime}</h2>

        <div className="card_container">
          {property.map((element, index) => {
            return (
              <div
                key={element?.id}
                className="cards"
                style={element?.clicked ? { transform: "rotateY(180deg)" } : {}}
                onClick={() =>
                  handleCardClick(element.id, element.path, element.solved)
                }
              >
                {element?.clicked ? (
                  <Image
                    width={110}
                    height={140}
                    draggable={false}
                    alt={index}
                    src={element.path}
                    className="rounded-[10px]"
                  />
                ) : (
                  <Image
                    className="rounded-[10px]"
                    width={110}
                    height={140}
                    draggable={false}
                    alt={index}
                    src="/images/blank.webp"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={restart}
          className="border-white border-2 rounded-xl p-[10px] hover:bg-[#3d3d3d] transition-all duration-300"
        >
          Return main menu
        </button>
      </div>
    </div>
  );
}
