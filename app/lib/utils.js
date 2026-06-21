import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Generate a shuffled deck of 12 cards (6 pairs) */
export function generateCards() {
  const cards = [];
  for (let i = 1; i <= 6; i++) {
    cards.push(
      { id: crypto.randomUUID(), path: `/cards/card${i}.jpg` },
      { id: crypto.randomUUID(), path: `/cards/card${i}.jpg` }
    );
  }
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
