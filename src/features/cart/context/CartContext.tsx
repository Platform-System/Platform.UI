"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { toast } from "@/shared/hooks/use-toast"
import { useCartStore } from "../store/cart-store"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
}

interface CartItemVariantUpdate {
  color?: string
  size?: string
}

export function useCart() {
  const t = useTranslations("Cart")
  const { 
    items, 
    isOpen,
    setIsOpen,
    addItem, 
    removeItem, 
    updateQuantity: storeUpdateQuantity, 
    updateItemVariant: storeUpdateItemVariant, 
    clearItems,
    getTotal,
    getCount
  } = useCartStore()
  
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const nextQuantity = Math.max(1, item.quantity ?? 1)

    toast({
      title: t("toastTitle"),
      description:
        nextQuantity > 1
          ? t("addedToCart", { quantity: nextQuantity, name: item.name })
          : t("addedToCartSingle", { name: item.name }),
    })

    addItem(item)
  }

  const removeFromCart = (id: number, color?: string, size?: string) => {
    removeItem(id, color, size)
  }

  const updateQuantity = (id: number, quantity: number, color?: string, size?: string) => {
    storeUpdateQuantity(id, quantity, color, size)
  }

  const updateItemVariant = (
    id: number,
    currentColor: string | undefined,
    currentSize: string | undefined,
    updates: CartItemVariantUpdate
  ) => {
    storeUpdateItemVariant(id, currentColor, currentSize, updates)
  }

  const clearCart = () => {
    clearItems()
  }

  const cartTotal = isHydrated ? getTotal() : 0
  const cartCount = isHydrated ? getCount() : 0

  return {
    cartItems: isHydrated ? items : [],
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemVariant,
    clearCart,
    cartTotal,
    cartCount,
  }
}
