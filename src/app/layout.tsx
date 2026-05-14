import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import QueryProvider from "@/core/providers/QueryProvider";
import AuthProvider from "@/core/providers/AuthProvider";
import { GlobalLoadingBar } from "@/shared/layout/GlobalLoadingBar";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "NYXORIS - Nyx's Radiance",
  description: "The official digital atelier of NYXORIS.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen bg-background text-foreground transition-colors duration-300 relative`}
        style={{ position: "relative" }}
      >
        <Toaster richColors closeButton position="top-right" />
        <AuthProvider>
          <QueryProvider>
          <div className="fixed top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full pointer-events-none opacity-100 z-0" style={{ background: 'rgb(255 255 255 / 0.08)', filter: 'blur(120px)' }} />
          <div className="fixed bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full pointer-events-none opacity-100 z-0" style={{ background: 'rgb(161 161 170 / 0.08)', filter: 'blur(120px)' }} />

          <div className="relative z-10 flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-300">
            <GlobalLoadingBar />
            <main
              style={{ viewTransitionName: 'main-content' } as React.CSSProperties}
              className="relative z-10 flex-1"
            >
              {children}
            </main>
          </div>
        </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

