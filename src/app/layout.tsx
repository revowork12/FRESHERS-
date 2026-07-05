import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif-numbers",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MGHSS Freshers' Day 2026",
  description:
    "Every beginning has a story. This is yours. MGHSS Chadayamangalam Freshers' Day 2026.",
  openGraph: {
    title: "MGHSS Freshers' Day 2026",
    description:
      "Every beginning has a story. This is yours. MGHSS Chadayamangalam Freshers' Day 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-dark text-text font-body">{children}</body>
    </html>
  );
}
