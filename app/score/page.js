"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "../components/Particles";

/** Format raw seconds into MM:SS */
function formatTime(totalSeconds) {
  const s = Number(totalSeconds);
  if (!Number.isFinite(s) || s < 0) return "--:--";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function RankBadge({ rank }) {
  if (rank === 1) return <div className="rank-badge rank-1">1</div>;
  if (rank === 2) return <div className="rank-badge rank-2">2</div>;
  if (rank === 3) return <div className="rank-badge rank-3">3</div>;
  return <div className="rank-badge rank-other">{rank}</div>;
}

// ─── Inner component that uses useSearchParams ───────────────────────────────
function LeaderboardInner() {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const myScore = searchParams.get("score");

  useEffect(() => {
    fetch("/api/score")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => setScores(Array.isArray(data) ? data : []))
      .catch(() => setError(true));
  }, []);

  // ── Error state ──
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <div className="glass p-8 text-center space-y-4 max-w-sm w-full mx-4">
          <p className="text-4xl">⚠️</p>
          <p className="text-lg font-semibold" style={{ color: "var(--text-muted)" }}>
            Failed to load leaderboard
          </p>
          <button className="btn-primary w-full" onClick={() => router.push("/")}>
            ← Back to game
          </button>
        </div>
      </div>
    );
  }

  // ── Loading state ──
  if (scores === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-rose)] animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[var(--accent-violet)] animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.6s" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen"
      style={{ background: "var(--bg)", overflowX: "hidden", overflowY: "auto" }}>

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
      <div className="relative z-10 w-full max-w-lg mt-20 flex flex-col items-center gap-6">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-black gradient-text tracking-tight mb-1">
            Leaderboard
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Fastest times win — can you top the board?
          </p>
        </motion.div>

        {/* ── Your score banner ── */}
        {myScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="glass glow-rose w-full rounded-2xl px-6 py-4 text-center"
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
              YOUR TIME
            </p>
            <p className="text-3xl font-black gradient-text">
              {formatTime(myScore)}
            </p>
          </motion.div>
        )}

        {/* ── Score rows ── */}
        <div className="w-full glass rounded-2xl overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[48px_1fr_80px] gap-2 px-5 py-3 border-b"
            style={{ borderColor: "var(--border)" }}>
            <span className="text-xs font-bold uppercase" style={{ color: "var(--text-muted)" }}>#</span>
            <span className="text-xs font-bold uppercase" style={{ color: "var(--text-muted)" }}>Player</span>
            <span className="text-xs font-bold uppercase text-right" style={{ color: "var(--text-muted)" }}>Time</span>
          </div>

          {scores.length === 0 ? (
            <div className="py-12 text-center" style={{ color: "var(--text-muted)" }}>
              <p className="text-sm font-medium">No scores yet — be the first!</p>
            </div>
          ) : (
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "min(55vh, 420px)" }}
            >
              {scores.map((entry, index) => {
                const rank = index + 1;
                const fullName = [entry.firstname, entry.lastname]
                  .filter(Boolean)
                  .join(" ") || "Anonymous";
                const isMe = myScore && entry.score === Number(myScore);

                return (
                  <motion.div
                    key={entry.userid ?? index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                    className="grid grid-cols-[48px_1fr_80px] gap-2 items-center px-5 py-3 transition-colors"
                    style={{
                      borderBottom: index < scores.length - 1
                        ? `1px solid var(--border)`
                        : "none",
                      background: isMe
                        ? "rgba(139, 92, 246, 0.12)"
                        : rank <= 3
                        ? "rgba(255,255,255,0.02)"
                        : "transparent",
                      boxShadow: isMe ? "inset 0 0 0 1px rgba(139,92,246,0.35)" : "none",
                    }}
                  >
                    <RankBadge rank={rank} />

                    <div className="min-w-0">
                      <p className="font-semibold truncate text-sm" style={{
                        color: isMe ? "var(--accent-violet)" : "var(--text)",
                      }}>
                        {fullName}
                        {isMe && (
                          <span className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: "rgba(139,92,246,0.2)", color: "var(--accent-violet)" }}>
                            you
                          </span>
                        )}
                      </p>
                    </div>

                    <p className="text-right font-mono font-bold text-sm"
                      style={{ color: rank === 1 ? "var(--gold)" : "var(--text)" }}>
                      {formatTime(entry.score)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── CTA buttons ── */}
        <div className="flex flex-row justify-center gap-3 w-full pb-6">
          <button
            id="btn-play-again"
            className="btn-primary"
            style={{ padding: "10px 16px", fontSize: "0.9rem", flex: "1 1 auto", maxWidth: "160px" }}
            onClick={() => router.push("/")}
          >
            Play Again
          </button>
          <button
            id="btn-home"
            className="btn-secondary"
            style={{ padding: "10px 16px", fontSize: "0.9rem", flex: "1 1 auto", maxWidth: "160px" }}
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Outer page — required Suspense wrapper for useSearchParams ────────────
export default function Result() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen"
          style={{ background: "var(--bg)" }}>
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-rose)] animate-spin" />
          </div>
        </div>
      }
    >
      <LeaderboardInner />
    </Suspense>
  );
}
