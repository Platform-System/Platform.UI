import { useTranslations } from "next-intl"
import { useState, useLayoutEffect, useMemo } from "react"
import { Store } from "lucide-react"
import { FilterBar } from "@platform-system/design-ui/components/filter-bar"
import { SellerCard } from "../components/seller-card"
import { useQuery } from "@tanstack/react-query"
import { fetchAllSellers, sellerQueryKeys } from "../queries/seller-queries"

export function SellersScreen() {
  // Trigger hot-reload for design-system updates
  const t = useTranslations("Seller")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(t("all"))

  const { data: allSellers = [], isLoading } = useQuery({
    queryKey: sellerQueryKeys.all,
    queryFn: fetchAllSellers,
    staleTime: 5 * 60 * 1000,
  })

  useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const categories = useMemo(() => {
    const categorySet = new Set<string>()

    allSellers.forEach((seller) => {
      seller.categories.forEach((category) => {
        if (category.trim()) {
          categorySet.add(category)
        }
      })
    })

    return [t("all"), ...Array.from(categorySet).sort((left, right) => left.localeCompare(right, "vi"))]
  }, [allSellers, t])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const filteredSellers = allSellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === t("all") || 
                           seller.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <span className="store-muted-text text-sm font-medium uppercase tracking-widest">
            {t("verifiedList")}
          </span>
          <h1 className="mt-3 mb-4 text-balance font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            {t("discoverSellers")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("discoverSellersDesc")}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            searchPlaceholder={t("searchSellerPlaceholder")}
          />
        </div>

        {/* Results Grid */}
        {filteredSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        ) : (
          <div className="ds-glass-panel rounded-2xl py-24 text-center shadow-[0_18px_32px_rgb(0_0_0/0.1)]">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {allSellers.length === 0 ? t("noSellers") : t("noSellersFound")}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {allSellers.length === 0 ? t("noSellersDesc") : t("noSellersFoundDesc")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

