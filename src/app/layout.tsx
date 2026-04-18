import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Sidebar from "@/components/shared/Sidebar";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <QueryProvider>
            <div className="flex flex-col h-screen w-screen bg-background text-foreground transition-colors duration-300">
              {/* Background Glow effects */}
              <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none dark:opacity-100 opacity-30 z-0"></div>
              <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none dark:opacity-100 opacity-30 z-0"></div>

              <Sidebar /> {/* Now Floating TopNav */}

              <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto scroll-smooth transition-all duration-300 z-10 custom-scrollbar">
                 {children}
              </main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
