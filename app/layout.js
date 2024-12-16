import "./globals.css";

export const metadata = {
  title: "Ariunbold",
  description: "my portfolio",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`HuTao`}>{children}</body>
    </html>
=======
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
>>>>>>> parent of ec80353 (change theme)
  );
}
