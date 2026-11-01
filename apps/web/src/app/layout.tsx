import type { Metadata } from "next";
import { Playfair, Inter } from "next/font/google";
import "./globals.scss";

const headingFont = Playfair({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NordHarbor",
  description: "Photography for a wilder world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
