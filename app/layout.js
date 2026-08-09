import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Magalang — Memory Card Game",
  description:
    "An anime-themed memory card matching game. Flip and match pairs as fast as you can to top the leaderboard.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="preconnect" href="https://clerk.com" />
          <link rel="preconnect" href="https://img.clerk.com" />
          <link rel="preconnect" href="https://accounts.clerk.com" />
        </head>
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
