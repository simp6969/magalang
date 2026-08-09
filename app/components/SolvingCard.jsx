"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../lib/utils";

// Flip easing: standard material-design curve — fast start, smooth finish, zero overshoot
const FLIP_TRANSITION = {
  type: "tween",
  duration: 0.18,
  ease: [0.4, 0, 0.2, 1],
};

export function SolvingCard({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      className="relative w-full aspect-[4/5] perspective-1000 cursor-pointer"
      onClick={onClick}
      // touch-action none prevents the 300ms tap delay on mobile
      style={{ touchAction: "none" }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={FLIP_TRANSITION}
        // GPU layer hint — keeps flip on compositor thread, never janks
        style={{ willChange: "transform" }}
      >
        {/* ── Front face: card back image ── */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-lg sm:rounded-xl overflow-hidden",
            "border border-white/10 shadow-md",
            "card-shimmer",
            "transition-[border-color,box-shadow] duration-150",
            "hover:border-[var(--accent-rose)]/40 hover:shadow-[0_0_16px_rgba(214,67,122,0.25)]"
          )}
        >
          <Image
            src="/cards/cardBack.jpg"
            alt="Card back"
            fill
            className="object-cover"
            sizes="(max-width: 560px) 33vw, 25vw"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* ── Back face: character image ── */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-lg sm:rounded-xl overflow-hidden rotate-y-180",
            "border shadow-md",
            isMatched
              ? "border-[var(--match-glow)]/70 glow-match"
              : "border-white/10 shadow-black/40"
          )}
        >
          <Image
            src={card.path}
            alt="Card character"
            fill
            className="object-cover"
            sizes="(max-width: 560px) 33vw, 25vw"
            loading="lazy"
          />

          {/* Matched overlay — simple CSS transition, no spring needed */}
          {isMatched && (
            <div className="absolute inset-0 bg-[var(--match-glow)]/10 flex items-center justify-center"
              style={{ animation: "matchFadeIn 0.2s ease-out both" }}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 border border-white/30"
                style={{ animation: "matchPop 0.2s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
