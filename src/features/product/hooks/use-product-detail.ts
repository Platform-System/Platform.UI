import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { fetchProductById, productQueryKeys } from "../queries/product-queries"
import { useCart } from "@/features/cart"
import { useWishlist } from "@/features/wishlist"
import { toast } from "sonner"
import { CARE_INSTRUCTIONS, getEnhancedProduct } from "../constants"

export function useProductDetail(id: string) {
  const t = useTranslations("Product")

  const { data: baseProduct, isLoading, isError } = useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  })

  const product = useMemo(() =>
    baseProduct
      ? getEnhancedProduct(baseProduct)
      : getEnhancedProduct({ id: "", name: "", price: 0, image: "", rating: 0, reviewCount: 0, seller: { name: "", verified: false } }),
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
  
  const isWishlisted = isInWishlist(product.id)

  const discount = useMemo(() => 
    product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
    [product.originalPrice, product.price]
  )

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
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
      removeFromWishlist(product.id)
      return
    }

    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      rating: product.rating,
      reviews: product.reviewCount,
      category: baseProduct?.category,
    })
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/product/${product.id}`
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
    isLoading,
    isError,
  }
}

