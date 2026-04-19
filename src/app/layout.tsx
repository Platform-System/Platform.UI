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
  title: "NYXORIS - Nyx's Radiance",
  description: "The official digital atelier of NYXORIS. Experience the intersection of machine precision and human aspiration.",
};

/**
 * RootLayout: Cấu trúc khung (Shell) của toàn bộ ứng dụng NYXORIS.
 * Thiết lập các Provider (Theme, Query) và bố cục Sidebar/Header cố định.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <QueryProvider>
            <div className="flex flex-col h-screen w-screen bg-background text-foreground transition-colors duration-300">
              
              {/* 1. Hiệu ứng ánh sáng nền (Glow effects) tạo chiều sâu cho UI */}
              <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none dark:opacity-100 opacity-30 z-0"></div>
              <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none dark:opacity-100 opacity-30 z-0"></div>

              {/* 2. Thanh điều hướng Sidebar/Header (Cố định ở trên đầu) */}
              <Sidebar /> 

              {/* 3. Vùng hiển thị nội dung chính (Có thể cuộn dọc độc lập) */}
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
