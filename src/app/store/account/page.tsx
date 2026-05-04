"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/features/components/ui/button"
import { Input } from "@/features/components/ui/input"
import { User, Package, Heart, Settings, LogOut, ShoppingBag } from "lucide-react"
import { useWishlist } from "@/features/context/WishlistContext"
import { useCart } from "@/features/context/CartContext"
import { Link } from "@/i18n/navigation"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/features/components/ui/empty"
import type { StoreOrder, StoreProfile } from "@/types/store"

const STORE_PROFILE_KEY = "nyx_profile"
const STORE_ORDERS_KEY = "nyx_orders"

const defaultProfile: StoreProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  joinedDate: "October 2024",
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState("profile")
  const [profile, setProfile] = React.useState<StoreProfile>(() => {
    if (typeof window === "undefined") {
      return defaultProfile
    }

    const savedProfile = window.localStorage.getItem(STORE_PROFILE_KEY)
    if (!savedProfile) {
      return defaultProfile
    }

    try {
      return JSON.parse(savedProfile)
    } catch {
      return defaultProfile
    }
  })
  const [orders] = React.useState<StoreOrder[]>(() => {
    if (typeof window === "undefined") {
      return []
    }

    const savedOrders = window.localStorage.getItem(STORE_ORDERS_KEY)
    if (!savedOrders) {
      return []
    }

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

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "orders", label: "Đơn hàng", icon: Package },
    { id: "wishlist", label: "Mục đã lưu", icon: Heart },
  ]

  const updateProfileField = (field: keyof StoreProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  const translateOrderStatus = (status: StoreOrder["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận"
      case "processing":
        return "Đang xử lý"
      case "shipped":
        return "Đang giao"
      case "delivered":
        return "Đã giao"
      default:
        return "Đang xử lý"
    }
  }

  const statusClassName = (status: StoreOrder["status"]) => {
    if (status === "delivered") {
      return "bg-emerald-500/20 text-emerald-400"
    }

    if (status === "shipped") {
      return "bg-sky-500/20 text-sky-400"
    }

    return "bg-gold/20 text-gold"
  }

  return (
    <div className="relative z-10 min-h-screen bg-background pt-24 pb-12 text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-serif text-3xl font-bold sm:text-4xl">Tài khoản của tôi</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex shrink-0 flex-row gap-2 overflow-x-auto border-b border-[rgb(var(--store-border-rgb)/0.7)] pb-4 md:flex-col md:overflow-visible md:border-b-0 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "store-accent-soft border border-[rgb(var(--store-accent-rgb)/0.18)] text-foreground"
                      : "text-muted-foreground hover:bg-[rgb(var(--store-accent-rgb)/0.08)] hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeTab === tab.id ? "store-accent-text" : ""}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
            <button className="mt-0 flex items-center gap-3 border-t border-[rgb(var(--store-border-rgb)/0.6)] px-4 py-3 pt-4 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 md:mt-auto">
              <LogOut className="h-5 w-5" />
              <span>Đăng xuất</span>
            </button>
          </div>

          <div className="store-surface-panel rounded-3xl p-6 shadow-2xl sm:p-8 md:col-span-3">
            {activeTab === "profile" && (
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">Thông tin cá nhân</h3>
                  <Button
                    variant={isEditingProfile ? "outline" : "default"}
                    className="rounded-xl font-semibold"
                    onClick={() => setIsEditingProfile((current) => !current)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {isEditingProfile ? "Xong" : "Chỉnh sửa hồ sơ"}
                  </Button>
                </div>

                <div className="mb-6 flex items-center gap-4 border-b border-[rgb(var(--store-border-rgb)/0.6)] pb-6">
                  <div className="relative size-20 overflow-hidden rounded-full border border-[rgb(var(--store-border-rgb)/0.85)]">
                    <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{profile.name}</h4>
                    <p className="text-xs text-muted-foreground">Tham gia từ {profile.joinedDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">Họ và tên</span>
                    {isEditingProfile ? (
                      <Input
                        className="h-11 rounded-xl"
                        value={profile.name}
                        onChange={(event) => updateProfileField("name", event.target.value)}
                      />
                    ) : (
                      <span className="store-surface-soft rounded-xl border px-3 py-2 text-sm font-medium">
                        {profile.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">Địa chỉ email</span>
                    {isEditingProfile ? (
                      <Input
                        className="h-11 rounded-xl"
                        value={profile.email}
                        onChange={(event) => updateProfileField("email", event.target.value)}
                      />
                    ) : (
                      <span className="store-surface-soft rounded-xl border px-3 py-2 text-sm font-medium">
                        {profile.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="flex flex-col">
                <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">Lịch sử mua hàng</h3>

                {orders.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="store-surface-soft rounded-2xl border p-4 transition-all hover:bg-[rgb(var(--store-accent-rgb)/0.08)]"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-foreground">{order.id}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("vi-VN")} • {order.items.length} sản phẩm
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {order.customerName} • {order.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="store-accent-text font-semibold">
                              ${order.total.toLocaleString()}
                            </span>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(order.status)}`}>
                              {translateOrderStatus(order.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="border-none bg-transparent px-0 py-10">
                    <EmptyMedia variant="icon" className="store-surface-soft store-muted-text flex h-16 w-16 items-center justify-center rounded-full">
                      <Package className="h-8 w-8" />
                    </EmptyMedia>
                    <EmptyTitle>Chưa có đơn hàng nào</EmptyTitle>
                    <EmptyDescription className="max-w-md">
                      Khi bạn hoàn tất checkout, đơn hàng sẽ xuất hiện ở đây để FE có thể nối tiếp sang order history từ backend.
                    </EmptyDescription>
                  </Empty>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="flex flex-col">
                <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">Mục đã lưu</h3>

                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="store-surface-soft flex items-center gap-4 rounded-2xl border p-4"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/store/product/${item.id}`}
                            className="line-clamp-2 text-sm font-semibold text-foreground transition-colors hover:store-accent-text"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.category ?? "Sản phẩm"} • ${item.price.toLocaleString()}
                          </p>
                          <Button
                            className="store-accent-button store-accent-button-strong mt-3 rounded-xl"
                            onClick={() =>
                              addToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                              })
                            }
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Thêm vào giỏ
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="border-none bg-transparent px-0 py-10">
                    <EmptyMedia variant="icon" className="store-surface-soft store-muted-text flex h-16 w-16 items-center justify-center rounded-full">
                      <Heart className="h-8 w-8" />
                    </EmptyMedia>
                    <EmptyTitle>Danh sách yêu thích đang trống</EmptyTitle>
                    <EmptyDescription className="max-w-md">
                      Những sản phẩm bạn lưu ở marketplace hoặc product detail sẽ hiện ở đây ngay.
                    </EmptyDescription>
                    <Button asChild className="store-accent-button store-accent-button-strong rounded-xl px-6">
                      <Link href="/store/marketplace">Khám phá sản phẩm</Link>
                    </Button>
                  </Empty>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
