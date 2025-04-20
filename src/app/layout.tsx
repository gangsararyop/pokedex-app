import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Filter from "./home/assets/Filter";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        {children}

        <div className="fixed z-30 w-full h-fit max-w-[360px] bottom-0 left-1/2 -translate-1/2">
          <div className="w-[36px] h-[36px] flex items-center justify-center bg-[#7374d8] ml-auto mb-1 mr-6 rounded-full">
            <Filter />
          </div>
        </div>
      </body>
    </html>
  );
}
