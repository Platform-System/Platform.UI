"use client"

import { SellerCard } from "@/features/seller"
import { useQuery } from "@tanstack/react-query"
import { fetchAllSellers, sellerQueryKeys } from "@/features/seller"

import { SectionHeader, SectionFooter } from "./section-header"

export function PopularSellersSection() {
  const { data: popularSellers = [] } = useQuery({
    queryKey: sellerQueryKeys.all,
    queryFn: fetchAllSellers,
    staleTime: 5 * 60 * 1000,
  })
  return (
    <section className="relative py-24 bg-background" style={{ position: "relative" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subtitle="Đối tác tin cậy"
          title="Nhà bán hàng nổi bật"
          description="Khám phá những nhà bán hàng được đánh giá cao với sản phẩm chất lượng và dịch vụ tận tâm. Mỗi gian hàng đều được xác thực theo tiêu chuẩn của chúng tôi."
        />

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>

        {/* View All */}
        <SectionFooter href="/sellers" label="Xem tất cả nhà bán hàng" />
      </div>
    </section>
  )
}


