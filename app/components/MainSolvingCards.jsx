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
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function MainSolvingCards() {
  const [gameState, setGameState] = useState({
    isPlaying: false, // Timer is running, user can play
    isPreview: false, // Initial 3s reveal
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

    if (gameState.isPlaying && !gameState.MenuPaused && gameState.dataFromStorage.length === 12) {
      intervalId = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          currentSeconds: prev.currentSeconds + 1,
        }));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameState.isPlaying, gameState.MenuPaused, gameState.dataFromStorage.length]);

  // Handle game completion
  useEffect(() => {
    async function run() {
      if (gameState.correctAnswers.length === 12 && gameState.correctAnswers.length > 0) {
        setGameState((prev) => ({
          ...prev,
          isPlaying: false,
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
  }, [gameState.correctAnswers, gameState.currentSeconds, router, user]);

  function handleHiddenImage(id, path) {
    // Prevent clicking if:
    // 1. Menu is paused
    // 2. Game is NOT playing (e.g. during preview)
    // 3. Already 2 cards selected
    // 4. Card is already selected
    // 5. Card is already matched
    if (
      gameState.MenuPaused ||
      !gameState.isPlaying ||
      gameState.selectedCards.length >= 2 ||
      gameState.selectedCards.includes(id) ||
      gameState.correctAnswers.includes(id)
    ) {
      return;
    }

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
        // Match found
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            correctAnswers: [...prev.correctAnswers, id, prev.selectedCards[0]],
            selectedCards: [],
            selectedPath: [],
          }));
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            selectedCards: [],
            selectedPath: [],
          }));
        }, 1000);
      }
    }
  }

  return (
    <div className="w-full h-full min-h-screen bg-[var(--ht-bg)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decoration - Reduced blur for performance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--ht-accent)] " />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-300 blur-[60px]" />
      </div>

      <ClerkLoading>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--ht-accent)]"></div>
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        {/* Header / Top Bar */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
          <h1 className="text-3xl font-bold text-[var(--ht-accent)] tracking-tight">
            Magalang
          </h1>
          
          <div className="flex items-center gap-4">
             {/* Timer Display */}
             {!gameState.MenuPaused && (
              <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full font-mono font-bold text-[var(--ht-accent)] shadow-sm border border-[var(--ht-accent)]/20">
                {new Date(gameState.currentSeconds * 1000).toISOString().substr(14, 5)}
              </div>
            )}

            <div className="flex items-center gap-2">
               <SignedIn>
                <UserButton afterSignOutUrl="/"/>
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
          {!gameState.MenuPaused && (
            <motion.div
              key="game-grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="z-10 grid grid-cols-3 md:grid-cols-4 gap-3 p-4 max-w-4xl w-full"
            >
              {gameState.dataFromStorage.map((card) => {
                const isFlipped = 
                  gameState.isPreview ||
                  gameState.selectedCards.includes(card.id) || 
                  gameState.correctAnswers.includes(card.id);
                
                const isMatched = gameState.correctAnswers.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className="relative aspect-[3/4] perspective-1000 cursor-pointer group"
                    onClick={() => handleHiddenImage(card.id, card.path)}
                  >
                    <motion.div
                      className="w-full h-full relative preserve-3d"
                      initial={false}
                      animate={{ 
                        rotateY: isFlipped ? 180 : 0,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        mass: 0.8
                      }}
                    >
                      {/* Front (Card Back Design) */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-md bg-white">
                        <Image
                          src="/cards/cardBack.jpg"
                          alt="Card Back"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 25vw"
                          priority
                        />
                      </div>

                      {/* Back (Actual Image) */}
                      <div 
                        className={cn(
                          "absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-md rotate-y-180 bg-white",
                          isMatched ? "ring-4 ring-green-500/50" : ""
                        )}
                      >
                        <Image
                          src={card.path}
                          alt="Card Front"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 25vw"
                        />
                        {isMatched && (
                          <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-1 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Overlay */}
        <AnimatePresence>
          {gameState.MenuPaused && (
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
                    onClick={() => {
                      // Reset game state and start preview
                      setGameState(prev => ({
                        ...prev,
                        MenuPaused: false,
                        isPlaying: false,
                        isPreview: true,
                        currentSeconds: 0,
                        selectedCards: [],
                        selectedPath: [],
                        correctAnswers: []
                      }));

                      // End preview after 3 seconds
                      setTimeout(() => {
                        setGameState(prev => ({
                          ...prev,
                          isPreview: false,
                          isPlaying: true
                        }));
                      }, 3000);
                    }}
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
