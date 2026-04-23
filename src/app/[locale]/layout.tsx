import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Allura, Playfair_Display } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Sidebar from "@/components/shared/Sidebar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
});

const allura = Allura({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
  variable: '--font-allura',
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
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${allura.variable} ${playfair.variable} antialiased h-screen overflow-hidden bg-background text-foreground transition-colors duration-300`}
      >
        {/* Persistent Visual Shell Background */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none dark:opacity-100 opacity-30 z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none dark:opacity-100 opacity-30 z-0"></div>
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <QueryProvider>
              <div className="flex flex-col h-screen w-screen bg-background text-foreground transition-colors duration-300 relative z-10">
                <Sidebar /> 
                <main 
                  style={{ viewTransitionName: 'main-content' } as React.CSSProperties}
                  className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto scroll-smooth z-10 custom-scrollbar"
                >
                   {children}
                </main>
              </div>
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
