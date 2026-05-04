"use client"

import { HeroSection } from "@/features/components/landing/hero-section"
import { CategoriesSection } from "@/features/components/landing/categories-section"
import { FeaturedProductsSection } from "@/features/components/landing/featured-products-section"
import { PopularSellersSection } from "@/features/components/landing/popular-sellers-section"
import { PromoBanner } from "@/features/components/landing/promo-banner"
import { SellerCtaSection } from "@/features/components/landing/seller-cta-section"
import { TrustSection } from "@/features/components/landing/trust-section"

/**
 * StoreShowcase: The premium narrative landing experience for the store.
 * Combines all high-end sections into a single smooth flow.
 */
export function Store() {
  return (
    <div className="relative">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <PromoBanner />
      <PopularSellersSection />
      <SellerCtaSection />
      <TrustSection />
    </div>
  )
}
