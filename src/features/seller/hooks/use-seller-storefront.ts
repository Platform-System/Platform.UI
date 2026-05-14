import * as React from "react"
import { useTranslations } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { fetchAllSellers, sellerQueryKeys } from "../queries/seller-queries"
import { SELLER_META_BY_SLUG, mapSellerProducts } from "../constants"

export function useSellerStorefront(slug: string) {
  const t = useTranslations("Seller")
  const [isFollowing, setIsFollowing] = React.useState(false)
  const [gridCols, setGridCols] = React.useState<3 | 4>(4)
  const [sortBy, setSortBy] = React.useState("featured")
  const [activeCategory, setActiveCategory] = React.useState(t("all"))
  const [activeTab, setActiveTab] = React.useState("products")
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data: allSellers = [] } = useQuery({
    queryKey: sellerQueryKeys.all,
    queryFn: fetchAllSellers,
    staleTime: 5 * 60 * 1000,
  })

  const seller = React.useMemo(() =>
    allSellers.find((item) => item.slug === slug),
    [allSellers, slug]
  )

  const safeSeller = seller ?? allSellers[0]
  
  const sellerMeta = React.useMemo(() =>
    safeSeller ? (SELLER_META_BY_SLUG[safeSeller.slug] || SELLER_META_BY_SLUG["luxe-leather-co"]) : undefined,
    [safeSeller]
  )

  const sellerProducts = React.useMemo(() =>
    safeSeller ? mapSellerProducts(safeSeller.slug) : [],
    [safeSeller]
  )

  const filteredProducts = React.useMemo(() => {
    const results = [...sellerProducts]

    // Sort logic
    results.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "newest") return Number(b.id) - Number(a.id)
      return 0
    })

    // Filter logic
    return results.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === t("all") || product.sellerCategory === activeCategory
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
    safeSeller,
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

