import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CacheContextApp from "@/contextApi/CacheContext";
import AuthContextApp from "@/contextApi/AuthContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "31M1 - Programmer",
  description: "Leaderboard for 31M1 students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <AuthContextApp>
          <CacheContextApp>
            {children}
          </CacheContextApp>
        </AuthContextApp>
      </body>
    </html>
  );
}
