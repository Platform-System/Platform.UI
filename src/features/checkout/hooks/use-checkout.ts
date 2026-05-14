import React from "react"
import { useCart } from "@/features/cart"
import { toast } from "sonner"
import { StoreOrder } from "@/types/store"
import { 
  CheckoutFormData, 
  DEFAULT_FORM_DATA, 
  DeliveryMethod, 
  PaymentMethod, 
  STORE_ORDERS_KEY 
} from "../constants"

function createOrderMeta() {
  return {
    orderId: `ORD-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
  }
}

export function useCheckout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [deliveryMethod, setDeliveryMethod] = React.useState<DeliveryMethod>("standard")
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("cod")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState<CheckoutFormData>(DEFAULT_FORM_DATA)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [orderSuccess, setOrderSuccess] = React.useState<StoreOrder | null>(null)

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
      toast.error("Thông tin chưa đầy đủ", {
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

      setOrderSuccess(orderPayload)
      clearCart()
      setIsSubmitting(false)
      setFormError(null)
      toast.success("Đặt hàng thành công", {
        description: `Đơn ${orderPayload.id} đã được tạo.`,
      })
    }, 1000)
  }

  return {
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
    orderSuccess,
  }
}

