export const STORE_ORDERS_KEY = "nyx_orders"

export type DeliveryMethod = "standard" | "express"
export type PaymentMethod = "cod" | "card" | "banking"

export type CheckoutFormData = {
  customerName: string
  phone: string
  email: string
  city: string
  district: string
  ward: string
  addressLine: string
  deliveryNote: string
}

export const DEFAULT_FORM_DATA: CheckoutFormData = {
  customerName: "Nguyen Minh Anh",
  phone: "0901 234 567",
  email: "minhanh@example.com",
  city: "TP. Ho Chi Minh",
  district: "Quan 7",
  ward: "Tan Phu",
  addressLine: "123 Nguyen Luong Bang, Sunrise City",
  deliveryNote: "Giao gio hanh chinh, vui long goi truoc khi giao.",
}

