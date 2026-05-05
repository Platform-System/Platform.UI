import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { featuredProducts, trendingProducts, newArrivals } from "@/shared/lib/data"
import { useCart } from "@/features/cart"
import { useWishlist } from "@/features/wishlist"
import { toast } from "sonner"
import { CARE_INSTRUCTIONS, getEnhancedProduct } from "../constants"

export function useProductDetail(id: string) {
  const t = useTranslations("Product")
  const allProducts = useMemo(() => [...featuredProducts, ...trendingProducts, ...newArrivals], [])
  const baseProduct = useMemo(() => allProducts.find((item) => item.id === id), [allProducts, id])
  
  const product = useMemo(() => 
    baseProduct ? getEnhancedProduct(baseProduct) : getEnhancedProduct(featuredProducts[0]), 
    [baseProduct]
  )

  const currentCare = useMemo(() => 
    CARE_INSTRUCTIONS[baseProduct?.category as keyof typeof CARE_INSTRUCTIONS] || CARE_INSTRUCTIONS.fashion,
    [baseProduct?.category]
  )

  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[1])
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | undefined>(() => {
    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 4)
    return defaultDate
  })

  const { addToCart, setIsOpen: setIsCartOpen } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const isWishlisted = isInWishlist(Number(product.id))

  const discount = useMemo(() => 
    product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
    [product.originalPrice, product.price]
  )

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setIsCartOpen(true)
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(Number(product.id))
      return
    }

    addToWishlist({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      rating: product.rating,
      reviews: product.reviewCount,
      category: baseProduct?.category,
    })
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/store/product/${product.id}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success(t("share.copied"), {
        description: t("share.copiedDesc"),
      })
    } catch {
      toast.error(t("share.copyError"), {
        description: t("share.copyErrorDesc"),
      })
    }
  }

  return {
    baseProduct,
    product,
    currentCare,
    currentImage,
    setCurrentImage,
    quantity,
    setQuantity,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    selectedDeliveryDate,
    setSelectedDeliveryDate,
    isWishlisted,
    discount,
    handleAddToCart,
    handleBuyNow,
    handleWishlistToggle,
    handleShare,
  }
}
