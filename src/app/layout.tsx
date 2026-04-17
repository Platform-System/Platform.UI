import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import Script from "next/script";
import Sidebar from "@/components/shared/Sidebar";
import TopNav from "@/components/shared/TopNav";
import MediaPlayer from "@/components/shared/MediaPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Platform.UI - Nexus Experience",
  description: "Next-generation frontend for Platform Microservices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-slate-50 overflow-hidden`}
      >
        <QueryProvider>
          <div className="flex h-screen overflow-hidden bg-[#0a0a0f] text-slate-50 relative">
            {/* Background Glow effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 relative z-10">
              <TopNav />
              
              {/* Main Scrollable Area */}
              <main className="flex-1 overflow-y-auto pb-32 md:pb-24 pt-4 scroll-smooth no-scrollbar">
                {children}
              </main>
            </div>

            {/* Global Media Player */}
            <MediaPlayer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
