"use client";

/**
 * Lightweight CSS-only floating orb background.
 * No canvas, no heavy libs — just absolutely positioned
 * divs with CSS animations from globals.css.
 */
export function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Rose orb — top left */}
      <div
        className="orb orb-rose"
        style={{
          width: 600,
          height: 600,
          top: "-15%",
          left: "-10%",
          animationDuration: "9s",
        }}
      />
      {/* Violet orb — bottom right */}
      <div
        className="orb orb-violet"
        style={{
          width: 500,
          height: 500,
          bottom: "-15%",
          right: "-10%",
          animationDuration: "11s",
          animationDelay: "-3s",
        }}
      />
      {/* Subtle rose center accent */}
      <div
        className="orb orb-rose"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          left: "55%",
          opacity: 0.3,
          animationDuration: "14s",
          animationDelay: "-6s",
        }}
      />
    </div>
  );
}
