"use client"

import React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Link } from "@/i18n/navigation"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty"
import { useCheckout } from "../hooks/use-checkout"

export function CheckoutScreen() {
  const t = useTranslations("Checkout")
  const tc = useTranslations("Cart")
  const {
    cartItems,
    cartTotal,
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    isSubmitting,
    formData,
    updateFormField,
    formError,
    shippingFee,
    taxAmount,
    grandTotal,
    handlePlaceOrder,
  } = useCheckout()

  React.useLayoutEffect(() => {
    const container = document.getElementById("store-scroll-container")
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-transparent pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="store-surface-panel rounded-[32px] px-6 py-20 text-center shadow-[0_16px_48px_rgb(15_23_42/0.1)]">
            <Empty className="border-none bg-transparent p-0">
              <EmptyMedia
                variant="icon"
                className="store-surface-soft store-muted-text mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-[0_10px_28px_rgb(15_23_42/0.08)]"
              >
                <CreditCard className="h-10 w-10" />
              </EmptyMedia>
              <EmptyTitle className="mt-5 text-xl font-semibold text-foreground">
                {t("emptyOrder")}
              </EmptyTitle>
              <EmptyDescription className="store-muted-text mt-3 max-w-md leading-7">
                {t("emptyOrderDesc")}
              </EmptyDescription>
            </Empty>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="store-accent-button store-accent-button-strong rounded-full px-8">
                <Link href="/store/marketplace">{tc("exploreProducts")}</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href="/store/cart">{tc("backToStore")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href="/store/cart"
            className="store-muted-text mb-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {tc("backToStore")}
          </Link>
          <h1 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="store-muted-text mt-3 max-w-2xl text-sm leading-7">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-6">
            <div className="store-surface-panel rounded-[28px] p-6 shadow-[0_14px_36px_rgb(15_23_42/0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="store-accent-text h-5 w-5" />
                <h2 className="text-xl font-semibold text-foreground">{t("customerInfo")}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder={t("fullName")} className="h-12 rounded-xl" value={formData.customerName} onChange={(e) => updateFormField("customerName", e.target.value)} />
                <Input placeholder={t("phone")} className="h-12 rounded-xl" value={formData.phone} onChange={(e) => updateFormField("phone", e.target.value)} />
                <Input placeholder={t("email")} className="h-12 rounded-xl sm:col-span-2" value={formData.email} onChange={(e) => updateFormField("email", e.target.value)} />
                <Input placeholder={t("city")} className="h-12 rounded-xl" value={formData.city} onChange={(e) => updateFormField("city", e.target.value)} />
                <Input placeholder={t("district")} className="h-12 rounded-xl" value={formData.district} onChange={(e) => updateFormField("district", e.target.value)} />
                <Input placeholder={t("ward")} className="h-12 rounded-xl" value={formData.ward} onChange={(e) => updateFormField("ward", e.target.value)} />
                <Input placeholder={t("address")} className="h-12 rounded-xl sm:col-span-2" value={formData.addressLine} onChange={(e) => updateFormField("addressLine", e.target.value)} />
                <Textarea placeholder={t("note")} className="min-h-28 rounded-2xl sm:col-span-2" value={formData.deliveryNote} onChange={(e) => updateFormField("deliveryNote", e.target.value)} />
              </div>

              {formError && <p className="mt-4 text-sm font-medium text-destructive">{formError}</p>}
            </div>

            <div className="store-surface-panel rounded-[28px] p-6 shadow-[0_14px_36px_rgb(15_23_42/0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <Truck className="store-accent-text h-5 w-5" />
                <h2 className="text-xl font-semibold text-foreground">{t("deliveryMethod")}</h2>
              </div>

              <div className="grid gap-4">
                <button onClick={() => setDeliveryMethod("standard")} className={`rounded-2xl border p-4 text-left transition-all ${deliveryMethod === "standard" ? "store-accent-soft border-[rgb(var(--store-accent-rgb)/0.25)]" : "store-surface-soft border-[rgb(var(--store-border-rgb)/0.7)] hover:bg-[rgb(var(--store-accent-rgb)/0.06)]"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{t("standardShipping")}</p>
                      <p className="store-muted-text mt-1 text-sm">{t("standardShippingDesc")}</p>
                    </div>
                    <span className="font-semibold text-foreground">{t("free")}</span>
                  </div>
                </button>

                <button onClick={() => setDeliveryMethod("express")} className={`rounded-2xl border p-4 text-left transition-all ${deliveryMethod === "express" ? "store-accent-soft border-[rgb(var(--store-accent-rgb)/0.25)]" : "store-surface-soft border-[rgb(var(--store-border-rgb)/0.7)] hover:bg-[rgb(var(--store-accent-rgb)/0.06)]"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{t("expressShipping")}</p>
                      <p className="store-muted-text mt-1 text-sm">{t("expressShippingDesc")}</p>
                    </div>
                    <span className="font-semibold text-foreground">$12</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="store-surface-panel rounded-[28px] p-6 shadow-[0_14px_36px_rgb(15_23_42/0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="store-accent-text h-5 w-5" />
                <h2 className="text-xl font-semibold text-foreground">{t("paymentMethod")}</h2>
              </div>

              <div className="grid gap-4">
                {[
                  { id: "cod" as const, title: t("cod"), description: t("codDesc") },
                  { id: "card" as const, title: t("card"), description: t("cardDesc") },
                  { id: "banking" as const, title: t("banking"), description: t("bankingDesc") },
                ].map((method) => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`rounded-2xl border p-4 text-left transition-all ${paymentMethod === method.id ? "store-accent-soft border-[rgb(var(--store-accent-rgb)/0.25)]" : "store-surface-soft border-[rgb(var(--store-border-rgb)/0.7)] hover:bg-[rgb(var(--store-accent-rgb)/0.06)]"}`}>
                    <p className="font-medium text-foreground">{method.title}</p>
                    <p className="store-muted-text mt-1 text-sm leading-6">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="store-surface-panel h-fit rounded-[30px] p-6 shadow-[0_18px_44px_rgb(15_23_42/0.1)] lg:sticky lg:top-28">
            <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">{t("paymentSummary")}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("yourOrder")}</h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-start gap-3">
                  <div className="store-surface-soft relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-foreground">{item.name}</p>
                    <p className="store-muted-text mt-1 text-xs">
                      {item.color ?? "Mặc định"} / {item.size ?? "Tiêu chuẩn"} / SL {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-[rgb(var(--store-border-rgb)/0.7)]" />

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="store-muted-text">{tc("subtotal")}</span>
                <span className="font-medium text-foreground">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="store-muted-text">{tc("shipping")}</span>
                <span className="font-medium text-foreground">{shippingFee === 0 ? t("free") : `$${shippingFee.toLocaleString()}`}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="store-muted-text">{t("tax")}</span>
                <span className="font-medium text-foreground">${taxAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="my-6 h-px bg-[rgb(var(--store-border-rgb)/0.7)]" />

            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-foreground">{t("total")}</span>
              <span className="store-total-value text-2xl">${grandTotal.toLocaleString()}</span>
            </div>

            <div className="store-surface-soft mt-5 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="store-accent-text mt-0.5 h-5 w-5 shrink-0" />
                <p className="store-muted-text text-sm leading-7">
                  {tc("demoNote")}
                </p>
              </div>
            </div>

            <Button className="store-accent-button store-accent-button-strong mt-6 h-12 w-full rounded-full" onClick={handlePlaceOrder} disabled={isSubmitting}>
              {isSubmitting ? t("processing") : t("confirmOrder")}
            </Button>

            <Button asChild variant="outline" className="mt-3 h-12 w-full rounded-full">
              <Link href="/store/cart">{tc("backToStore")}</Link>
            </Button>
          </aside>
        </div>
      </div>
    </div>
  )
}
