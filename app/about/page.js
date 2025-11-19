"use client";

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
      className="h-[100vh] w-[100vw] text-[var(--ht-text)]  flex items-center justify-center "
    >
      <div className="backdrop-blur-xl p-[10px] rounded-[20px]">
        <div className="text-[25px] flex gap-[10px] flex-col justify-center items-center">
          <h1>Game Rules</h1>
          <p className="abt">match the cards by clicking on them</p>
          <p>About</p>
          <p>customize:</p>
          <p className="abt">warning: customized cards cannot have rank</p>
          <h1>Credits:</h1>
          <p className="abt">stoobid mf who lives in a trash can</p>
          <div className="abt">
            msexpensive discord:{" "}
            <button
              className="text-[var(--ht-accent)]"
              onClick={() => {
                navigator.clipboard.writeText("expensiveixia_72613");
              }}
            >
              expensiveixia_72613
            </button>
          </div>
          <div className="abt">
            yumi discord:{" "}
            <button
              className="text-[var(--ht-accent)]"
              onClick={() => {
                navigator.clipboard.writeText("yumixchu#1129");
              }}
            >
              yumixchu#1129
            </button>
          </div>
          <div className="abt">
            RayReii discord:{" "}
            <button
              className="text-[var(--ht-accent)]"
              onClick={() => {
                navigator.clipboard.writeText("Reii#7498");
              }}
            >
              Reii#7498
            </button>
          </div>
          <div className="abt">
            Coffee discord:{" "}
            <button
              className="text-[var(--ht-accent)]"
              onClick={() => {
                navigator.clipboard.writeText("Coffingo#2403");
              }}
            >
              Coffingo#2403
            </button>
          </div>
          <button onClick={() => router.push("/")} className="primaryButton">
            <p>return</p>
            {/* <svg
              width={50}
              height={50}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg> */}
          </button>
        </div>
      </div>
    </div>
  );
}
