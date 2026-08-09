"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function MainHeader() {
  return (
    <header className="flex w-full justify-between items-center px-6 py-4"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-glass)", backdropFilter: "blur(12px)" }}>
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-black gradient-text tracking-tight">Magalang</h1>
        <nav className="flex items-center gap-5">
          <a href="/about" className="text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}>About</a>
          <a href="/score" className="text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}>Leaderboard</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.875rem" }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
