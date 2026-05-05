import { useTranslations } from "next-intl"
import { useState, useLayoutEffect } from "react"
import { Store } from "lucide-react"
import { FilterBar } from "@/shared/components/ui/filter-bar"
import { SellerCard } from "../components/seller-card"
import { popularSellers } from "@/shared/lib/data"

export function SellersScreen() {
  const t = useTranslations("Seller")
  const categories = t.raw("categories") as string[]
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(t("all"))

  useLayoutEffect(() => {
    const container = document.getElementById('store-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const filteredSellers = popularSellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === t("all") || 
                           seller.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-16">
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
          <div className="store-surface-panel rounded-2xl py-24 text-center shadow-[0_18px_32px_rgb(15_23_42/0.1)]">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">{t("noSellersFound")}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("noSellersFoundDesc")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
