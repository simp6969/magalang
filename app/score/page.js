"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Result() {
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
      .then((data) => setScores(data))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="flex text-[var(--ht-text)] justify-center items-center h-screen w-screen flex-col gap-4">
        <p className="text-xl">Failed to load leaderboard</p>
        <button className="primaryButton" onClick={() => router.push("/")}>
          return
        </button>
      </div>
    );
  }

  if (scores === null) {
    return (
      <div className="text-center w-screen h-screen flex items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--ht-accent)]" />
      </div>
    );
  }

  return (
    <div className="flex text-[var(--ht-text)] justify-center items-center h-screen w-screen overflow-hidden flex-col gap-5">
      <h1 className="font-bold text-3xl text-[var(--ht-accent)]">LEADERBOARD</h1>

      {myScore && (
        <div className="bg-[var(--ht-accent)] text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          <p className="text-xl font-bold">Your Time: {myScore} seconds</p>
        </div>
      )}

      <div className="flex flex-row gap-5 w-[300px] justify-center font-bold">
        <p>place</p>
        <p>lastname</p>
        <p>score(sec)</p>
      </div>

      <div className="w-[80%] sm:w-[30%] border-black border rounded-lg" />

      <div className="flex w-[300px] overflow-y-auto border-[2.5px] justify-start rounded-lg max-h-80 h-[40vh] p-5 gap-3 border-[#20151A] items-center flex-col bg-white/50 backdrop-blur-sm">
        {scores.length === 0 ? (
          <p className="text-[var(--ht-text)]/60">No scores yet. Be the first!</p>
        ) : (
          scores.map((e, index) => (
            <div key={e.userid || index} className="flex box-content w-full justify-around">
              <p>{index + 1}</p>
              <p className="w-[50%] text-center">{e.lastname}</p>
              <p>{e.score} s</p>
            </div>
          ))
        )}
      </div>

      <button className="primaryButton" onClick={() => router.push("/")}>
        return
      </button>
    </div>
  );
}
