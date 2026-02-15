
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Corinthia } from "next/font/google";

const corinthia = Corinthia({
  variable: "--font-corinthia",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Web Dev Cohort Learnings",
  description: "A showcase of assignments, labs, and blogs from the Web Dev Cohort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${corinthia.variable} antialiased min-h-screen flex flex-col bg-background text-foreground relative`}
      >
        <Navbar />
        {/* Global Background */}
        <div className="absolute inset-0 -z-50 h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,125,12,0.15),rgba(255,255,255,0))] opacity-20" />
          <img
            src="/background.svg"
            alt="Background"
            className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 object-cover opacity-60 dark:opacity-100"
          />
        </div>
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
