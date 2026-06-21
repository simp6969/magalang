"use client";

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen text-[var(--ht-text)] flex flex-col items-center justify-center relative overflow-hidden p-5 text-center">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <h1 className="text-3xl font-bold text-[var(--ht-accent)] tracking-tight drop-shadow-sm">
          Magalang
        </h1>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--ht-accent)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-300 blur-[60px]" />
      </div>

      <div className="backdrop-blur-xl p-4 rounded-2xl">
        <div className="text-[25px] flex gap-3 flex-col justify-center items-center">
          <h2 className="font-bold">Game Rules</h2>
          <p>match the cards by clicking on them</p>
          <h2 className="font-bold">Credits:</h2>
          <p>stoobid mf who lives in a trash can</p>
          <div>
            msexpensive discord:{" "}
            <button className="text-[var(--ht-accent)]" onClick={() => navigator.clipboard.writeText("expensiveixia_72613")}>
              expensiveixia_72613
            </button>
          </div>
          <div>
            yumi discord:{" "}
            <button className="text-[var(--ht-accent)]" onClick={() => navigator.clipboard.writeText("yumixchu#1129")}>
              yumixchu#1129
            </button>
          </div>
          <div>
            RayReii discord:{" "}
            <button className="text-[var(--ht-accent)]" onClick={() => navigator.clipboard.writeText("Reii#7498")}>
              Reii#7498
            </button>
          </div>
          <div>
            Coffee discord:{" "}
            <button className="text-[var(--ht-accent)]" onClick={() => navigator.clipboard.writeText("Coffingo#2403")}>
              Coffingo#2403
            </button>
          </div>
          <button onClick={() => router.push("/")} className="primaryButton">
            return
          </button>
        </div>
      </div>
    </div>
  );
}
