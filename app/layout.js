import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Magalang",
  description: "A memory card matching game",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <meta name="viewport" content= "width=device-width, user-scalable=no"></meta>
        <body className={poppins.className}>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
