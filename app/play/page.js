"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { CheckSign } from "../components/CheckSign";
import { CardContainer } from "../components/CardContainer";
import { Data } from "../components/Data";

export default function App() {
  const router = useRouter();
  const [property, setProperty] = useState(shuffleArray(Data));
  const [fisrtClick, setFirstClick] = useState();
  const [displayTime, setDisplayTime] = useState(0);
  const [sign, setSign] = useState();
  const [solvedCards, setSolvedCards] = useState(0);
  const [data, setData] = useState({ fisrtClick: 0, click: 1 });
  let seconds = 0;
  function shuffleArray(array) {
    const sorted = array.sort((a, b) => a.id - b.id);
    return sorted;
  }
  function handleCardClick(id, path, solved) {
    // setClick(click + 1);
    setData({ ...data, click: data.click + 1 });
    const updatedProperty = property.map((card) => {
      if (card.id === id) {
        return { ...card, clicked: true };
      }
      return card;
    });

    setProperty(updatedProperty);

    if (data.click === 1) {
      setFirstClick({ id, path, solved });
      // setData({ ...data, fisrtClick: { id, path, solved } });

      if (solved) {
        console.log("thts solved card");
        // setClick(1);
        setData({ ...data, click: 1 });

        return { id: id, path: path, solved: true, clicked: true };
      }
    } else if (data.click === 2) {
      // setClick(1);
      setData({ ...data, click: 1 });

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

        <CardContainer property={property} handleCardClick={handleCardClick} />

        <button
          onClick={() => router.push("/")}
          className="border-white border-2 rounded-xl p-[10px] hover:bg-[#3d3d3d] transition-all duration-300"
        >
          Return main menu
        </button>
      </div>
    </div>
  );
}
