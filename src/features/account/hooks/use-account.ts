import React from "react"
import { StoreOrder, StoreProfile } from "@/types/store"
import { DEFAULT_PROFILE, STORE_ORDERS_KEY, STORE_PROFILE_KEY } from "../constants"
import { useWishlist } from "@/features/wishlist"
import { useCart } from "@/features/cart"

export function useAccount() {
  const [activeTab, setActiveTab] = React.useState("profile")
  const [profile, setProfile] = React.useState<StoreProfile>(() => {
    if (typeof window === "undefined") return DEFAULT_PROFILE
    const savedProfile = window.localStorage.getItem(STORE_PROFILE_KEY)
    if (!savedProfile) return DEFAULT_PROFILE
    try {
      return JSON.parse(savedProfile)
    } catch {
      return DEFAULT_PROFILE
    }
  })
  
  const [orders] = React.useState<StoreOrder[]>(() => {
    if (typeof window === "undefined") return []
    const savedOrders = window.localStorage.getItem(STORE_ORDERS_KEY)
    if (!savedOrders) return []
    try {
      return JSON.parse(savedOrders)
    } catch {
      return []
    }
  })

  const [isEditingProfile, setIsEditingProfile] = React.useState(false)
  const { wishlistItems } = useWishlist()
  const { addToCart } = useCart()

  React.useEffect(() => {
    window.localStorage.setItem(STORE_PROFILE_KEY, JSON.stringify(profile))
  }, [profile])

  const updateProfileField = (field: keyof StoreProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  const translateOrderStatus = (status: StoreOrder["status"]) => {
    switch (status) {
      case "pending": return "Chờ xác nhận"
      case "processing": return "Đang xử lý"
      case "shipped": return "Đang giao"
      case "delivered": return "Đã giao"
      default: return "Đang xử lý"
    }
  }

  const statusClassName = (status: StoreOrder["status"]) => {
    if (status === "delivered") return "bg-emerald-500/20 text-emerald-400"
    if (status === "shipped") return "bg-sky-500/20 text-sky-400"
    return "bg-gold/20 text-gold"
  }

  return {
    activeTab,
    setActiveTab,
    profile,
    orders,
    isEditingProfile,
    setIsEditingProfile,
    wishlistItems,
    addToCart,
    updateProfileField,
    translateOrderStatus,
    statusClassName,
  }
}
