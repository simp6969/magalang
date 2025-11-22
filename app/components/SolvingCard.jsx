"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function SolvingCard({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      className="relative aspect-[2/3] perspective-1000 cursor-pointer group" // Standard playing card ratio
      onClick={onClick}
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
          mass: 0.8,
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
            className="object-contain"
            sizes="(max-width: 768px) 33vw, 25vw"
          />
          {isMatched && (
            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-1 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
