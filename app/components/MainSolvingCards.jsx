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
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SolvingCard } from "./SolvingCard";
import { generateCards } from "../lib/utils";

export function MainSolvingCards() {
  const [cards, setCards] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [menuPaused, setMenuPaused] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(0);

  const router = useRouter();
  const { user } = useUser();

  // Generate cards on mount
  useEffect(() => {
    setCards(generateCards());
  }, []);

  // Timer
  useEffect(() => {
    if (!isPlaying || menuPaused || cards.length !== 12) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        secondsRef.current = s + 1;
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, menuPaused, cards.length]);

  // Game completion
  useEffect(() => {
    if (correctAnswers.length !== 12 || correctAnswers.length === 0) return;

    setIsPlaying(false);
    const finalScore = secondsRef.current;

    async function submitScore() {
      if (user?.id) {
        try {
          await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname: user.firstName,
              lastname: user.lastName,
              userid: user.id,
              score: finalScore,
            }),
          });
        } catch (err) {
          console.error("Failed to submit score:", err);
        }
      }
      router.push("/score?score=" + finalScore);
    }

    submitScore();
  }, [correctAnswers.length, router, user]);

  function handleCardClick(id, path) {
    if (
      menuPaused ||
      !isPlaying ||
      selectedCards.length >= 2 ||
      selectedCards.includes(id) ||
      correctAnswers.includes(id)
    ) {
      return;
    }

    const newSelected = [...selectedCards, id];
    const newPaths = [...selectedPaths, path];
    setSelectedCards(newSelected);
    setSelectedPaths(newPaths);

    if (newSelected.length === 2) {
      if (newPaths[0] === newPaths[1] && newSelected[0] !== newSelected[1]) {
        // Match
        setTimeout(() => {
          setCorrectAnswers((prev) => [...prev, newSelected[0], newSelected[1]]);
          setSelectedCards([]);
          setSelectedPaths([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([]);
          setSelectedPaths([]);
        }, 1000);
      }
    }
  }

  function startGame() {
    const newCards = generateCards();
    setCards(newCards);
    setMenuPaused(false);
    setIsPlaying(false);
    setIsPreview(true);
    setSeconds(0);
    secondsRef.current = 0;
    setSelectedCards([]);
    setSelectedPaths([]);
    setCorrectAnswers([]);

    setTimeout(() => {
      setIsPreview(false);
      setIsPlaying(true);
    }, 3000);
  }

  return (
    <div className="w-full h-full min-h-screen bg-[var(--ht-bg)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--ht-accent)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-300 blur-[60px]" />
      </div>

      <ClerkLoading>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--ht-accent)]" />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
          <h1 className="text-3xl font-bold text-[var(--ht-accent)] tracking-tight">
            Magalang
          </h1>
          <div className="flex items-center gap-4">
            {!menuPaused && (
              <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full font-mono font-bold text-[var(--ht-accent)] shadow-sm border border-[var(--ht-accent)]/20">
                {new Date(seconds * 1000).toISOString().substr(14, 5)}
              </div>
            )}
            <div className="flex items-center gap-2">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-full bg-[var(--ht-accent)] text-white font-semibold hover:opacity-90 transition-opacity text-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <AnimatePresence mode="wait">
          {!menuPaused && (
            <motion.div
              key="game-grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="z-10 grid grid-cols-3 md:grid-cols-4 gap-3 p-4 max-w-4xl w-full"
            >
              {cards.map((card) => (
                <SolvingCard
                  key={card.id}
                  card={card}
                  isFlipped={
                    isPreview ||
                    selectedCards.includes(card.id) ||
                    correctAnswers.includes(card.id)
                  }
                  isMatched={correctAnswers.includes(card.id)}
                  onClick={() => handleCardClick(card.id, card.path)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Overlay */}
        <AnimatePresence>
          {menuPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--ht-bg)]/95 backdrop-blur-sm"
            >
              <div className="text-center space-y-8 p-8">
                <h2 className="text-5xl md:text-7xl font-extrabold text-[var(--ht-accent)] tracking-tighter drop-shadow-sm">
                  Magalang
                </h2>
                <p className="text-lg text-[var(--ht-text)]/80 max-w-md mx-auto font-medium">
                  Test your memory. Match the cards to win!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-[var(--ht-accent)] text-white text-xl font-bold rounded-2xl shadow-lg shadow-[var(--ht-accent)]/30 hover:shadow-xl hover:shadow-[var(--ht-accent)]/40 transition-all min-w-[200px] hover:scale-105 active:scale-95"
                  >
                    Play Now
                  </button>
                  <button
                    onClick={() => router.push("/about")}
                    className="px-8 py-4 bg-white text-[var(--ht-text)] text-xl font-bold rounded-2xl shadow-md hover:shadow-lg transition-all min-w-[200px] border-2 border-transparent hover:border-[var(--ht-accent)]/10 hover:scale-105 active:scale-95"
                  >
                    About
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ClerkLoaded>
    </div>
  );
}
