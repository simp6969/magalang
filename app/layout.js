import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "clerk test",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8vh",
            overflow: "hidden",
          }}
          className={inter.className}
        >
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
