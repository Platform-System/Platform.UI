"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useCartStore, CartItem } from "../store/cart-store"

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true)
  }, [])

  const addToCart = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const nextQuantity = Math.max(1, item.quantity ?? 1)

    toast.success(t("toastTitle"), {
      description:
        nextQuantity > 1
          ? t("addedToCart", { quantity: nextQuantity, name: item.name })
          : t("addedToCartSingle", { name: item.name }),
    })

    addItem(item)
  }, [addItem, t])

  const removeFromCart = useCallback((id: number, color?: string, size?: string) => {
    removeItem(id, color, size)
  }, [removeItem])

  const updateQuantity = useCallback((id: number, quantity: number, color?: string, size?: string) => {
    storeUpdateQuantity(id, quantity, color, size)
  }, [storeUpdateQuantity])

  const updateItemVariant = useCallback((
    id: number,
    currentColor: string | undefined,
    currentSize: string | undefined,
    updates: CartItemVariantUpdate
  ) => {
    storeUpdateItemVariant(id, currentColor, currentSize, updates)
  }, [storeUpdateItemVariant])

  const clearCart = useCallback(() => {
    clearItems()
  }, [clearItems])

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

