import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { HydrationFlag } from "@/components/HydrationFlag";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = "react-colorful — a tiny color picker for React";
const description =
  "A tiny (3.1 KB), fast, accessible and dependency-free color picker component for React and Preact.";

export const metadata: Metadata = {
  metadataBase: new URL("https://react-colorful.com"),
  title,
  description,
  openGraph: { title, description, images: [{ url: "/og.png", width: 1200, height: 630 }] },
  // Markdown copy of the page for agents, like colord.dev
  alternates: { types: { "text/markdown": "/index.md" } },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#ed2f7e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <HydrationFlag />
      </body>
    </html>
  );
}
