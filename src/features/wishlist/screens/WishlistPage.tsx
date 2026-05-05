"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "@/features/cart"
import { Button } from "@/shared/components/ui/button"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/shared/components/ui/empty"

export function Wishlist() {
  const t = useTranslations("Wishlist")
  const tc = useTranslations("Cart")
  const tp = useTranslations("Product")
  
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart, setIsOpen: setIsCartOpen } = useCart()

  React.useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const handleAddToCart = (item: (typeof wishlistItems)[number]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 mb-10">
          <div>
            <Link href="/store/marketplace" className="store-muted-text mb-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {tc("backToStore")}
            </Link>
            <h1 className="flex items-center gap-3 text-3xl font-serif font-semibold tracking-wide text-foreground sm:text-4xl">
              <Heart className="store-accent-text store-accent-fill-soft h-8 w-8" />
              {t("title")}
            </h1>
            <p className="store-muted-text mt-2 text-sm">
              {t("description")}
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="store-surface-soft self-start rounded-full border-none transition-all hover:bg-destructive/10 hover:text-destructive md:self-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t("clearAll")}
            </Button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="store-surface-panel mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl p-8 py-20 text-center shadow-[0_16px_48px_rgb(15_23_42/0.1)]"
            >
              <Empty className="bg-transparent border-none p-0 md:p-0 gap-4 flex flex-col items-center">
                <EmptyMedia variant="icon" className="store-surface-soft store-muted-text flex h-20 w-20 items-center justify-center rounded-full shadow-[0_8px_24px_rgb(15_23_42/0.08)]">
                  <Heart className="h-10 w-10" />
                </EmptyMedia>
                <EmptyTitle className="text-xl font-semibold text-foreground">{t("empty")}</EmptyTitle>
                <EmptyDescription className="store-muted-text mb-4 max-w-sm">
                  {t("emptyDesc")}
                </EmptyDescription>
              </Empty>
              <Button asChild className="store-accent-button store-accent-button-strong h-12 rounded-full px-8 font-semibold">
                <Link href="/store/marketplace">{t("exploreNow")}</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlistItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="store-surface-panel group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:shadow-[0_12px_32px_rgb(15_23_42/0.12)]"
                >
                  <div className="store-surface-soft relative aspect-square w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="store-surface-panel absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {item.category && (
                        <span className="store-accent-subtitle block mb-1 text-[10px] font-semibold uppercase tracking-widest">
                          {item.category}
                        </span>
                      )}
                      <h3 className="line-clamp-2 text-base font-medium text-foreground transition-colors group-hover:store-accent-text">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="store-accent-button store-accent-button-strong group/btn flex h-10 w-full items-center justify-center gap-2 rounded-full font-semibold transition-all"
                      >
                        <ShoppingBag className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        {tp("addToCart")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
