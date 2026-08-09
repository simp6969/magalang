"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "../components/Particles";

const CREDITS = [
  { name: "msexpensive", discord: "expensiveixia_72613" },
  { name: "yumi",        discord: "yumixchu#1129" },
  { name: "RayReii",     discord: "Reii#7498" },
  { name: "Coffee",      discord: "Coffingo#2403" },
];

function CopyButton({ label, value }) {
  function copy() {
    navigator.clipboard.writeText(value).catch(() => {});
  }
  return (
    <button
      onClick={copy}
      title="Click to copy"
      className="font-mono text-sm px-3 py-1 rounded-lg transition-all"
      style={{
        background: "rgba(214,67,122,0.12)",
        color: "var(--accent-rose)",
        border: "1px solid rgba(214,67,122,0.25)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214,67,122,0.22)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(214,67,122,0.12)")}
    >
      {value}
    </button>
  );
}

export default function About() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "var(--bg)", overflowX: "hidden" }}
    >
      <Particles />

      {/* ── Header ── */}
      <div className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-black gradient-text tracking-tight">
          Magalang
        </h1>
        <button
          onClick={() => router.push("/")}
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          ← Back
        </button>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-md mt-12 flex flex-col gap-5">

        {/* How to play */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass p-6 rounded-2xl"
        >
          <h2 className="text-lg font-black gradient-text mb-4 uppercase tracking-wider">
             How to Play
          </h2>
          <ul className="space-y-2" style={{ color: "var(--text-muted)" }}>
            <li className="flex gap-3 text-sm">
              <span className="mt-0.5">1.</span>
              <span>Press <strong style={{ color: "var(--text)" }}>Play Now</strong> — the cards are shown for 3 seconds. Memorize them!</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="mt-0.5">2.</span>
              <span>Click any card to flip it, then click a second card to try to match it.</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="mt-0.5">3.</span>
              <span>Match all 6 pairs as fast as possible. Your time is your score — lower is better!</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="mt-0.5">4.</span>
              <span>Sign in to save your best time to the global leaderboard.</span>
            </li>
          </ul>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="glass p-6 rounded-2xl"
        >
          <h2 className="text-lg font-black gradient-text mb-4 uppercase tracking-wider">
             Credits
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            stoobid mf who lives in a trash can
          </p>
          <div className="space-y-3">
            {CREDITS.map(({ name, discord }) => (
              <div key={name} className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {name}
                </span>
                <CopyButton value={discord} />
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Click any username to copy it to clipboard.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <button
            id="btn-about-play"
            className="btn-primary flex-1"
            onClick={() => router.push("/")}
          >
             Play Now
          </button>
          <button
            id="btn-about-leaderboard"
            className="btn-secondary flex-1"
            onClick={() => router.push("/score")}
          >
            Leaderboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}
