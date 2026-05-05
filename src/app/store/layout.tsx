import { Header } from "@/shared/components/shell/header"
import { Footer } from "@/shared/components/shell/footer"
import { CartDrawer } from "@/features/cart"
import { Toaster } from "@/shared/components/ui/toaster"
import I18nProvider from "@/core/providers/I18nProvider"
import viMessages from "@/../messages/vi.json"

/**
 * StoreLayout: The global layout for all store-related pages.
 * Features a high-end monochrome background and shared navigation.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider locale="vi" messages={viMessages}>
      <div className="store-theme relative h-full w-full bg-background text-foreground selection:bg-primary/25 selection:text-charcoal">
        {/* Premium Background Effects */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgb(var(--store-surface-strong-rgb)/0.82)_0%,rgb(247_245_242/0.97)_42%,rgb(241_244_246)_100%)]" />

        {/* Mesh Gradient Glows - Optimized for performance */}
        <div className="pointer-events-none fixed top-[-10%] left-[-10%] z-0 h-[40%] w-[40%] rounded-full bg-[rgb(var(--store-accent-rgb)/0.12)] blur-[80px]" />
        <div className="pointer-events-none fixed top-[10%] right-[-10%] z-0 h-[30%] w-[30%] rounded-full bg-[rgb(var(--store-border-rgb)/0.3)] blur-[60px]" />
        <div className="pointer-events-none fixed bottom-[-10%] left-[20%] z-0 h-[50%] w-[50%] rounded-full bg-[rgb(var(--store-surface-strong-rgb)/0.5)] blur-[100px]" />

        {/* Subtle Texture Overlay */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgb(var(--store-muted-rgb)/0.1)_1px,transparent_1px)] opacity-[0.02] [background-size:24px_24px]" />

        {/* The Scrollable Surface */}
        <main id="store-scroll-container" className="h-screen w-full overflow-y-auto scroll-smooth relative z-10">
          <Header />
          {children}
          <Footer />
        </main>
        <CartDrawer />
        <Toaster />
      </div>
    </I18nProvider>
  );
}
