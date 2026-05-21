import { Product } from "@/types/store"
import {
  featuredProducts,
  trendingProducts,
  newArrivals,
  popularSellers,
} from "@/shared/lib/data"

export type SellerReview = {
  id: number
  author: string
  avatar: string
  rating: number
  date: string
  content: string
  product: string
}

export type SellerProduct = Product & {
  sellerCategory: string
}

export const SELLER_META_BY_SLUG: Record<
  string,
  {
    followers: number
    memberSince: string
    reviews: SellerReview[]
  }
> = {
  "luxe-leather-co": {
    followers: 12500,
    memberSince: "January 2020",
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        date: "2 weeks ago",
        content: "Excellent quality and amazing customer service. Will definitely buy again!",
        product: "Premium Leather Tote Bag",
      },
      {
        id: 2,
        author: "Michael R.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 5,
        date: "1 month ago",
        content:
          "The craftsmanship is impeccable. You can tell these are made with love and care.",
        product: "Classic Leather Wallet",
      },
    ],
  },
  "nordic-home": {
    followers: 9800,
    memberSince: "March 2021",
    reviews: [
      {
        id: 1,
        author: "Elena V.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 5,
        date: "1 week ago",
        content: "Beautiful proportions and the finish feels extremely premium in person.",
        product: "Minimalist Ceramic Vase Set",
      },
      {
        id: 2,
        author: "David K.",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 4,
        date: "3 weeks ago",
        content: "Fast shipping and the design language matches the photos perfectly.",
        product: "Linen Throw Blanket",
      },
    ],
  },
  techvault: {
    followers: 18400,
    memberSince: "August 2019",
    reviews: [
      {
        id: 1,
        author: "Chris T.",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        rating: 5,
        date: "5 days ago",
        content: "Packaging was immaculate and setup took only a few minutes.",
        product: "Wireless Noise-Canceling Headphones",
      },
      {
        id: 2,
        author: "Monica S.",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        rating: 4,
        date: "2 weeks ago",
        content: "Strong product knowledge and very responsive before purchase.",
        product: "Smart Home Speaker",
      },
    ],
  },
  "artisan-gems": {
    followers: 7600,
    memberSince: "November 2020",
    reviews: [
      {
        id: 1,
        author: "Nina R.",
        avatar:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop",
        rating: 5,
        date: "4 days ago",
        content: "The finish and packaging felt like opening a true couture piece.",
        product: "Handcrafted Gold Earrings",
      },
      {
        id: 2,
        author: "Olivia P.",
        avatar:
          "https://images.unsplash.com/photo-1542204625-de293a2f8ff0?w=100&h=100&fit=crop",
        rating: 5,
        date: "1 month ago",
        content: "Exactly as pictured and the seller answered every question quickly.",
        product: "Signature Stone Pendant",
      },
    ],
  },
}

export function mapSellerProducts(slug: string): SellerProduct[] {
  const allProducts = [...featuredProducts, ...trendingProducts, ...newArrivals]

  switch (slug) {
    case "luxe-leather-co":
      return [
        { ...featuredProducts[0], sellerCategory: "Bags" },
        {
          ...featuredProducts[6],
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Accessories",
        },
        {
          ...newArrivals[0],
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Accessories",
        },
        {
          ...featuredProducts[7],
          name: "Classic Leather Wallet",
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Wallets",
        },
        {
          ...trendingProducts[1],
          name: "Heritage Leather Belt",
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Belts",
        },
        {
          ...featuredProducts[0],
          id: "101",
          name: "Structured Weekender Bag",
          seller: { name: "Luxe Leather Co.", verified: true },
          sellerCategory: "Bags",
        },
      ]
    case "nordic-home":
      return [
        { ...featuredProducts[1], sellerCategory: "Home Decor" },
        { ...featuredProducts[7], seller: { name: "Nordic Home", verified: true }, sellerCategory: "Furniture" },
        { ...trendingProducts[3], seller: { name: "Nordic Home", verified: true }, sellerCategory: "Lighting" },
        {
          ...featuredProducts[1],
          id: "201",
          name: "Oak Side Table",
          seller: { name: "Nordic Home", verified: true },
          sellerCategory: "Furniture",
        },
        {
          ...featuredProducts[7],
          id: "202",
          name: "Textured Floor Lamp",
          seller: { name: "Nordic Home", verified: true },
          sellerCategory: "Lighting",
        },
        {
          ...trendingProducts[3],
          id: "203",
          name: "Stoneware Serving Set",
          seller: { name: "Nordic Home", verified: true },
          sellerCategory: "Home Decor",
        },
      ]
    case "techvault":
      return allProducts
        .filter((product) =>
          ["TechVault", "Tech Vault"].includes(product.seller.name),
        )
        .map((product, index) => ({
          ...product,
          sellerCategory: index % 3 === 0 ? "Electronics" : index % 3 === 1 ? "Gadgets" : "Audio",
        }))
    case "artisan-gems":
      return [
        { ...featuredProducts[3], sellerCategory: "Jewelry" },
        {
          ...featuredProducts[3],
          id: "401",
          name: "Pearl Drop Necklace",
          seller: { name: "Artisan Gems", verified: true },
          sellerCategory: "Handcrafted",
        },
        {
          ...featuredProducts[3],
          id: "402",
          name: "Sculpted Signet Ring",
          seller: { name: "Artisan Gems", verified: true },
          sellerCategory: "Accessories",
        },
        {
          ...featuredProducts[3],
          id: "403",
          name: "Atelier Chain Bracelet",
          seller: { name: "Artisan Gems", verified: true },
          sellerCategory: "Jewelry",
        },
      ]
    default:
      return featuredProducts.slice(0, 6).map((product) => ({
        ...product,
        seller: { name: popularSellers[0].name, verified: true },
        sellerCategory: popularSellers[0].categories[0] ?? "Featured",
      }))
  }
}

