import * as React from "react"
import { useTranslations } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { fetchSellerBySlug, fetchSellerProductsBySlug, sellerQueryKeys } from "../queries/seller-queries"
import { SELLER_META_BY_SLUG } from "../constants"
import { slugify } from "@/shared/lib/storefront-normalizers"

export function useSellerStorefront(slug: string) {
  const t = useTranslations("Seller")
  const [isFollowing, setIsFollowing] = React.useState(false)
  const [gridCols, setGridCols] = React.useState<3 | 4>(4)
  const [sortBy, setSortBy] = React.useState("featured")
  const [activeCategory, setActiveCategory] = React.useState(t("all"))
  const [activeTab, setActiveTab] = React.useState("products")
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data: seller } = useQuery({
    queryKey: sellerQueryKeys.detail(slug),
    queryFn: () => fetchSellerBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  })

  const sellerMeta = React.useMemo(() =>
    seller ? (SELLER_META_BY_SLUG[seller.slug] || SELLER_META_BY_SLUG["luxe-leather-co"]) : undefined,
    [seller]
  )

  const { data: sellerProducts = [] } = useQuery({
    queryKey: ["sellers", slug, "products"],
    queryFn: () => fetchSellerProductsBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  })

  const filteredProducts = React.useMemo(() => {
    const results = [...sellerProducts]

    // Sort logic
    results.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "newest") {
        const numA = Number(a.id)
        const numB = Number(b.id)
        if (!isNaN(numA) && !isNaN(numB)) {
          return numB - numA
        }
        return b.id.localeCompare(a.id)
      }
      return 0
    })

    // Filter logic
      return results.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === t("all") || product.category === slugify(activeCategory)
      return matchesSearch && matchesCategory
    })
  }, [sellerProducts, sortBy, searchQuery, activeCategory, t])

  const ratingDistribution = [
    { stars: 5, width: 78 },
    { stars: 4, width: 18 },
    { stars: 3, width: 6 },
    { stars: 2, width: 3 },
    { stars: 1, width: 2 },
  ]

  return {
    seller,
    sellerMeta,
    filteredProducts,
    ratingDistribution,
    isFollowing,
    setIsFollowing,
    gridCols,
    setGridCols,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  }
}

