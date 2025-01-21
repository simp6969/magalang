import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Ariunbold",
  description: "my portfolio",
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
          className={"HuTao"}
        >
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
