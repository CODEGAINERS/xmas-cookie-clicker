// app/layout.js
import { Luckiest_Guy } from "next/font/google"; // Import der Schriftart
import "./globals.css";

const luckiestGuy = Luckiest_Guy({
  weight: "400", // Optional: Wenn du einen bestimmten Schriftschnitt verwenden möchtest
  subsets: ["latin"],
  variable: "--font-luckiest-guy", // Dies erstellt eine CSS-Variable
});

export const metadata = {
  title: "X-MAS COOKIE CLICKER",
  description: "Ein interaktives Weihnachts-Cookie-Clicker-Spiel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${luckiestGuy.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
