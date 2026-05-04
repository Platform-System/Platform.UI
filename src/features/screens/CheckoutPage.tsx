"use client"

import React from "react"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/features/components/ui/button"
import { Input } from "@/features/components/ui/input"
import { Textarea } from "@/features/components/ui/textarea"
import { Link } from "@/i18n/navigation"
import { useCart } from "@/features/context/CartContext"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/features/components/ui/empty"
import { toast } from "@/shared/hooks/use-toast"
import type { StoreOrder } from "@/types/store"

type DeliveryMethod = "standard" | "express"
type PaymentMethod = "cod" | "card" | "banking"

type CheckoutFormData = {
  customerName: string
  phone: string
  email: string
  city: string
  district: string
  ward: string
  addressLine: string
  deliveryNote: string
}

const STORE_ORDERS_KEY = "nyx_orders"

const defaultFormData: CheckoutFormData = {
  customerName: "Nguyen Minh Anh",
  phone: "0901 234 567",
  email: "minhanh@example.com",
  city: "TP. Ho Chi Minh",
  district: "Quan 7",
  ward: "Tan Phu",
  addressLine: "123 Nguyen Luong Bang, Sunrise City",
  deliveryNote: "Giao gio hanh chinh, vui long goi truoc khi giao.",
}

function createOrderMeta() {
  return {
    orderId: `ORD-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
  }
}

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [deliveryMethod, setDeliveryMethod] = React.useState<DeliveryMethod>("standard")
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("cod")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState<CheckoutFormData>(defaultFormData)
  const [formError, setFormError] = React.useState<string | null>(null)

  React.useLayoutEffect(() => {
    const container = document.getElementById("store-scroll-container")
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [])

  const shippingFee = deliveryMethod === "express" ? 12 : 0
  const taxAmount = Math.round(cartTotal * 0.08)
  const grandTotal = cartTotal + shippingFee + taxAmount

  const updateFormField = (field: keyof CheckoutFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setFormError(null)
  }

  const validateForm = () => {
    const requiredFields: Array<[keyof CheckoutFormData, string]> = [
      ["customerName", "Họ và tên"],
      ["phone", "Số điện thoại"],
      ["email", "Email"],
      ["city", "Tỉnh / Thành phố"],
      ["district", "Quận / Huyện"],
      ["ward", "Phường / Xã"],
      ["addressLine", "Địa chỉ chi tiết"],
    ]

    const missingField = requiredFields.find(([field]) => !formData[field].trim())
    if (missingField) {
      return `Vui lòng nhập ${missingField[1].toLowerCase()}.`
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email.trim())) {
      return "Email chưa đúng định dạng."
    }

    return null
  }

  const buildOrderPayload = (orderId: string, createdAt: string): StoreOrder => ({
    id: orderId,
    createdAt,
    customerName: formData.customerName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    city: formData.city.trim(),
    district: formData.district.trim(),
    ward: formData.ward.trim(),
    addressLine: formData.addressLine.trim(),
    deliveryNote: formData.deliveryNote.trim(),
    deliveryMethod,
    paymentMethod,
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    })),
    subtotal: cartTotal,
    shippingFee,
    taxAmount,
    total: grandTotal,
    status: "processing",
  })

  const handlePlaceOrder = () => {
    const validationError = validateForm()
    if (validationError) {
      setFormError(validationError)
      toast({
        title: "Thông tin chưa đầy đủ",
        description: validationError,
      })
      return
    }

    setIsSubmitting(true)
    const { orderId, createdAt } = createOrderMeta()
    const orderPayload = buildOrderPayload(orderId, createdAt)

    window.setTimeout(() => {
      const existingOrders = window.localStorage.getItem(STORE_ORDERS_KEY)
      const parsedOrders: StoreOrder[] = existingOrders ? JSON.parse(existingOrders) : []
      window.localStorage.setItem(STORE_ORDERS_KEY, JSON.stringify([orderPayload, ...parsedOrders]))

      clearCart()
      setIsSubmitting(false)
      setFormError(null)
      toast({
        title: "Đặt hàng thành công",
        description: `Đơn ${orderPayload.id} đã được tạo. Flow này đã sẵn để map sang API đặt hàng.`,
      })
    }, 600)
  }

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
                Chưa có đơn hàng để thanh toán
              </EmptyTitle>
              <EmptyDescription className="store-muted-text mt-3 max-w-md leading-7">
                Hãy quay lại cửa hàng hoặc thêm sản phẩm vào giỏ trước khi tiếp tục bước checkout.
              </EmptyDescription>
            </Empty>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="store-accent-button store-accent-button-strong rounded-full px-8">
                <Link href="/store/marketplace">Khám phá sản phẩm</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href="/store/cart">Quay lại giỏ hàng</Link>
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
            Quay lại giỏ hàng
          </Link>
          <h1 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            Thanh toán đơn hàng
          </h1>
          <p className="store-muted-text mt-3 max-w-2xl text-sm leading-7">
            Trang checkout này đã có form state, validate và payload order demo để bạn nối tiếp sang API backend.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-6">
            <div className="store-surface-panel rounded-[28px] p-6 shadow-[0_14px_36px_rgb(15_23_42/0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="store-accent-text h-5 w-5" />
                <h2 className="text-xl font-semibold text-foreground">Thông tin người nhận</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Họ và tên" className="h-12 rounded-xl" value={formData.customerName} onChange={(e) => updateFormField("customerName", e.target.value)} />
                <Input placeholder="Số điện thoại" className="h-12 rounded-xl" value={formData.phone} onChange={(e) => updateFormField("phone", e.target.value)} />
                <Input placeholder="Email" className="h-12 rounded-xl sm:col-span-2" value={formData.email} onChange={(e) => updateFormField("email", e.target.value)} />
                <Input placeholder="Tỉnh / Thành phố" className="h-12 rounded-xl" value={formData.city} onChange={(e) => updateFormField("city", e.target.value)} />
                <Input placeholder="Quận / Huyện" className="h-12 rounded-xl" value={formData.district} onChange={(e) => updateFormField("district", e.target.value)} />
                <Input placeholder="Phường / Xã" className="h-12 rounded-xl" value={formData.ward} onChange={(e) => updateFormField("ward", e.target.value)} />
                <Input placeholder="Địa chỉ chi tiết" className="h-12 rounded-xl sm:col-span-2" value={formData.addressLine} onChange={(e) => updateFormField("addressLine", e.target.value)} />
                <Textarea placeholder="Ghi chú giao hàng" className="min-h-28 rounded-2xl sm:col-span-2" value={formData.deliveryNote} onChange={(e) => updateFormField("deliveryNote", e.target.value)} />
              </div>

              {formError && <p className="mt-4 text-sm font-medium text-destructive">{formError}</p>}
            </div>

            <div className="store-surface-panel rounded-[28px] p-6 shadow-[0_14px_36px_rgb(15_23_42/0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <Truck className="store-accent-text h-5 w-5" />
                <h2 className="text-xl font-semibold text-foreground">Phương thức giao hàng</h2>
              </div>

              <div className="grid gap-4">
                <button onClick={() => setDeliveryMethod("standard")} className={`rounded-2xl border p-4 text-left transition-all ${deliveryMethod === "standard" ? "store-accent-soft border-[rgb(var(--store-accent-rgb)/0.25)]" : "store-surface-soft border-[rgb(var(--store-border-rgb)/0.7)] hover:bg-[rgb(var(--store-accent-rgb)/0.06)]"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">Giao hàng tiêu chuẩn</p>
                      <p className="store-muted-text mt-1 text-sm">Nhận hàng trong 3-5 ngày làm việc.</p>
                    </div>
                    <span className="font-semibold text-foreground">Miễn phí</span>
                  </div>
                </button>

                <button onClick={() => setDeliveryMethod("express")} className={`rounded-2xl border p-4 text-left transition-all ${deliveryMethod === "express" ? "store-accent-soft border-[rgb(var(--store-accent-rgb)/0.25)]" : "store-surface-soft border-[rgb(var(--store-border-rgb)/0.7)] hover:bg-[rgb(var(--store-accent-rgb)/0.06)]"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">Giao hàng hỏa tốc</p>
                      <p className="store-muted-text mt-1 text-sm">Ưu tiên xử lý và giao trong 24-48 giờ.</p>
                    </div>
                    <span className="font-semibold text-foreground">$12</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="store-surface-panel rounded-[28px] p-6 shadow-[0_14px_36px_rgb(15_23_42/0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="store-accent-text h-5 w-5" />
                <h2 className="text-xl font-semibold text-foreground">Phương thức thanh toán</h2>
              </div>

              <div className="grid gap-4">
                {[
                  { id: "cod" as const, title: "Thanh toán khi nhận hàng", description: "Phù hợp cho luồng demo và người dùng muốn kiểm tra hàng trước." },
                  { id: "card" as const, title: "Thẻ tín dụng / ghi nợ", description: "Mô phỏng tích hợp cổng thanh toán trực tuyến trong các bước sau." },
                  { id: "banking" as const, title: "Chuyển khoản ngân hàng", description: "Phù hợp để demo bước xác nhận thanh toán thủ công từ backend." },
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
            <p className="store-muted-text text-[11px] uppercase tracking-[0.18em]">Tóm tắt thanh toán</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">Đơn hàng của bạn</h2>

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
                <span className="store-muted-text">Tạm tính</span>
                <span className="font-medium text-foreground">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="store-muted-text">Vận chuyển</span>
                <span className="font-medium text-foreground">{shippingFee === 0 ? "Miễn phí" : `$${shippingFee.toLocaleString()}`}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="store-muted-text">Thuế tạm tính</span>
                <span className="font-medium text-foreground">${taxAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="my-6 h-px bg-[rgb(var(--store-border-rgb)/0.7)]" />

            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-foreground">Tổng thanh toán</span>
              <span className="store-total-value text-2xl">${grandTotal.toLocaleString()}</span>
            </div>

            <div className="store-surface-soft mt-5 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="store-accent-text mt-0.5 h-5 w-5 shrink-0" />
                <p className="store-muted-text text-sm leading-7">
                  Sau khi ổn định UI, bước tiếp theo rất hợp để nối trang này vào API `orders`, `payments`, `addresses` ở backend .NET của bạn.
                </p>
              </div>
            </div>

            <Button className="store-accent-button store-accent-button-strong mt-6 h-12 w-full rounded-full" onClick={handlePlaceOrder} disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </Button>

            <Button asChild variant="outline" className="mt-3 h-12 w-full rounded-full">
              <Link href="/store/cart">Quay lại giỏ hàng</Link>
            </Button>
          </aside>
        </div>
      </div>
    </div>
  )
}
