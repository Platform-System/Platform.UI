"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useWishlistStore } from "../store/wishlist-store"

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category?: string
}

export function useWishlist() {
  const t = useTranslations("Wishlist")
  const { items, addItem, removeItem, clearItems, isInWishlist: storeIsInWishlist } = useWishlistStore()
  
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const addToWishlist = (item: WishlistItem) => {
    toast.success(t("toastTitle"), {
      description: t("addedToWishlist", { name: item.name }),
    })
    addItem(item)
  }

  const removeFromWishlist = (id: number) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      toast.info(t("toastTitle"), {
        description: t("removedFromWishlist", { name: item.name }),
      })
    }
    removeItem(id)
  }

  const isInWishlist = (id: number) => {
    return storeIsInWishlist(id)
  }

  const clearWishlist = () => {
    clearItems()
  }

  const wishlistCount = isHydrated ? items.length : 0

  return {
    wishlistItems: isHydrated ? items : [],
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount,
  }
}
