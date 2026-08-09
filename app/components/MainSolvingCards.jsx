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
import Image from "next/image";
import { SolvingCard } from "./SolvingCard";
import { Particles } from "./Particles";
import { generateCards } from "../lib/utils";

/** Format seconds → MM:SS */
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── Timing constants — tuned for speedrunners ──────────────────────────────
const MATCH_DELAY    = 350;  // ms to confirm a match  (was 500)
const NO_MATCH_DELAY = 700;  // ms to show a non-match (was 1000)
const PREVIEW_TIME   = 3000; // memorize phase

export function MainSolvingCards() {
  // holy shi thats a pretty big state
  const [cards, setCards]               = useState([]);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [isPreview, setIsPreview]       = useState(false);
  const [menuPaused, setMenuPaused]     = useState(true);
  const [submitting, setSubmitting]     = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [seconds, setSeconds]           = useState(0);
  const secondsRef = useRef(0);

  const router = useRouter();
  const { user } = useUser();

  // Generate cards on mount
  useEffect(() => { setCards(generateCards()); }, []);

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
    setSubmitting(true);
    const finalScore = secondsRef.current;

    async function submitScore() {
      if (user?.id) {
        try {
          await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname: user.firstName,
              lastname:  user.lastName,
              userid:    user.id,
              score:     finalScore,
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
    ) return;

    const newSelected = [...selectedCards, id];
    const newPaths    = [...selectedPaths, path];
    setSelectedCards(newSelected);
    setSelectedPaths(newPaths);

    if (newSelected.length === 2) {
      if (newPaths[0] === newPaths[1] && newSelected[0] !== newSelected[1]) {
        // ✓ Match
        setTimeout(() => {
          setCorrectAnswers((prev) => [...prev, newSelected[0], newSelected[1]]);
          setSelectedCards([]);
          setSelectedPaths([]);
        }, MATCH_DELAY);
      } else {
        // ✗ No match
        setTimeout(() => {
          setSelectedCards([]);
          setSelectedPaths([]);
        }, NO_MATCH_DELAY);
      }
    }
  }
// damn dude 
  function startGame() {
    setCards(generateCards());
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
    }, PREVIEW_TIME);
  }

  const pairsFound = correctAnswers.length / 2;

  return (
    // game-root: overflow-hidden + fixed + iOS safe-area padding (see globals.css)
    <div className="game-root flex flex-col items-center" style={{ background: "var(--bg)" }}>
      <Particles />

      {/* ── Clerk loading spinner ── */}
      <ClerkLoading>
        <div className="flex items-center justify-center h-full w-full">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-rose)] animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[var(--accent-violet)] animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "0.6s" }} />
          </div>
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        {/* ── Header — fixed 64px height ── */}
        <div className="relative z-50 w-full flex-shrink-0 h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <h1 className="text-xl sm:text-2xl font-black gradient-text tracking-tight">
              Magalang
            </h1>
            {/* Nav only visible on wider screens while in menu */}
            {/* {menuPaused && (
              <nav className="hidden sm:flex items-center gap-4">
                <a href="/score" className="text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}>Leaderboard</a>
                <a href="/about" className="text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}>About</a>
              </nav>
            )} */}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Timer pill */}
            {!menuPaused && !submitting && (
              <div className="timer-pill">{formatTime(seconds)}</div>
            )}
            {/* Pairs counter */}
            {!menuPaused && !submitting && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass text-xs font-bold"
                style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--accent-violet)" }}>{pairsFound}</span>
                <span>/6</span>
              </div>
            )}
            <SignedIn><UserButton /></SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-primary" style={{ padding: "7px 14px", fontSize: "0.8rem" }}>
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* ── Submitting overlay ── */}
        <AnimatePresence>
          {submitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4"
              style={{ background: "rgba(8,8,15,0.92)", backdropFilter: "blur(12px)" }}
            >
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-rose)] animate-spin" />
              </div>
              <p className="text-lg font-bold gradient-text">Saving your score…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Game Grid ── */}
        {/* Uses .game-grid CSS class for responsive layout (see globals.css) */}
        <AnimatePresence mode="wait">
          {!menuPaused && !submitting && (
            <motion.div
              key="game-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="game-grid relative z-10"
            >


              {cards.map((card) => (
                // No per-card entrance animation — it was adding stagger delay
                // and causing choppiness when grids mount
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

        {/* ── Menu Overlay ── */}
        <AnimatePresence>
          {menuPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
            >
              <div className="text-center w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-black gradient-text tracking-tighter leading-none mb-2">
                    Magalang
                  </h2>
                  <p className="text-sm sm:text-base font-medium" style={{ color: "var(--text-muted)" }}>
                    Flip. Match. Dominate the board.
                  </p>
                </motion.div>

                {/* Fanned card preview */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.08, ease: "easeOut" }}
                  className="flex justify-center gap-2"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="relative w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden border border-white/10 shadow-lg flex-shrink-0"
                      style={{ transform: `rotate(${(n - 2.5) * 4}deg)`, zIndex: n }}
                    >
                      <Image
                        src={`/cards/card${n}.jpg`}
                        alt={`preview ${n}`}
                        fill
                        sizes="(max-width: 640px) 4rem, 5rem"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25" />
                    </div>
                  ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.14, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <button
                    id="btn-play"
                    onClick={startGame}
                    className="btn-primary text-base sm:text-lg w-full sm:w-auto"
                    style={{ minWidth: 160 }}
                  >
                    Play Now
                  </button>
                  <button
                    id="btn-leaderboard"
                    onClick={() => router.push("/score")}
                    className="btn-secondary text-base sm:text-lg w-full sm:w-auto"
                    style={{ minWidth: 160 }}
                  >
                    Leaderboard
                  </button>
                </motion.div>

                {/* About link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                >
                  <a href="/about" className="text-xs sm:text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}>
                    How to play →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ClerkLoaded>
    </div>
  );
}
