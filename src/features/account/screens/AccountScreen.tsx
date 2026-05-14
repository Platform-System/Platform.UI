"use client"

import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { User, Package, Heart, Settings, LogOut, ShoppingBag } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty"
import { useAccount } from "../hooks/use-account"
import { StoreOrder, StoreProfile } from "@/types/store"

export function AccountScreen() {
  const t = useTranslations("Account")
  const tc = useTranslations("Cart")
  const tp = useTranslations("Product")
  
  const {
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
  } = useAccount()

  const tabs = [
    { id: "profile", label: t("tabProfile"), icon: User },
    { id: "orders", label: t("tabOrders"), icon: Package },
    { id: "wishlist", label: t("tabWishlist"), icon: Heart },
  ]

  const getTranslatedStatus = (status: StoreOrder["status"]) => {
    switch (status) {
      case "pending": return t("statusPending")
      case "processing": return t("statusProcessing")
      case "shipped": return t("statusShipped")
      case "delivered": return t("statusDelivered")
      default: return t("statusProcessing")
    }
  }

  return (
    <div className="relative z-10 min-h-screen bg-background pt-24 pb-12 text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-serif text-3xl font-bold sm:text-4xl">{t("title")}</h1>

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
              <span>{t("logout")}</span>
            </button>
          </div>

          <div className="store-surface-panel rounded-3xl p-6 shadow-2xl sm:p-8 md:col-span-3">
            {activeTab === "profile" && (
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{t("personalInfo")}</h3>
                  <Button
                    variant={isEditingProfile ? "outline" : "default"}
                    className="rounded-xl font-semibold"
                    onClick={() => setIsEditingProfile((current) => !current)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {isEditingProfile ? t("done") : t("editProfile")}
                  </Button>
                </div>

                <div className="mb-6 flex items-center gap-4 border-b border-[rgb(var(--store-border-rgb)/0.6)] pb-6">
                  <div className="relative size-20 overflow-hidden rounded-full border border-[rgb(var(--store-border-rgb)/0.85)]">
                    <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{profile.name}</h4>
                    <p className="text-xs text-muted-foreground">{t("joinedSince")} {profile.joinedDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">{t("fullName")}</span>
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
                    <span className="text-xs text-muted-foreground">{t("email")}</span>
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
                <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">{t("orderHistory")}</h3>

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
                              {new Date(order.createdAt).toLocaleDateString("vi-VN")} • {order.items.length} {tc("itemCount", { count: order.items.length })}
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
                              {getTranslatedStatus(order.status)}
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
                    <EmptyTitle>{t("noOrders")}</EmptyTitle>
                    <EmptyDescription className="max-w-md">
                      {t("noOrdersDesc")}
                    </EmptyDescription>
                  </Empty>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="flex flex-col">
                <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">{t("tabWishlist")}</h3>

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
                            href={`/product/${item.id}`}
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
                            {tp("addToCart")}
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
                    <EmptyTitle>{t("wishlistEmpty")}</EmptyTitle>
                    <EmptyDescription className="max-w-md">
                      {t("wishlistEmptyDesc")}
                    </EmptyDescription>
                    <Button asChild className="store-accent-button store-accent-button-strong rounded-xl px-6">
                      <Link href="/marketplace">{tc("exploreProducts")}</Link>
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

