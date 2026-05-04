export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isBestSeller?: boolean;
}

export interface StoreOrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface StoreOrder {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  addressLine: string;
  deliveryNote: string;
  deliveryMethod: "standard" | "express";
  paymentMethod: "cod" | "card" | "banking";
  items: StoreOrderItem[];
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
}

export interface StoreProfile {
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
}
