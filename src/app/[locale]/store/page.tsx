'use client';

import React from 'react';
import { ProductIntro } from '@/components/store/ProductIntro';
import { StoreSection } from '@/components/store/StoreSection';
import { SideNavigation } from '@/components/store/SideNavigation';
import { useStoreScroll } from '@/context/StoreScrollContext';

import { DiversitySection } from '@/components/store/DiversitySection';
import { MarketplaceSection } from '@/components/store/MarketplaceSection';
import { TrustSection } from '@/components/store/TrustSection';
import { CollectionPortal } from '@/components/store/CollectionPortal';

/**
 * StoreHome: Trang chính của mục Store.
 * Cấu trúc 5 chương mới dựa trên 3 trục: Mua sắm (Diversity) - Đăng bán (Marketplace) - Tin cậy (Trust).
 */
export default function StoreHome() {
  const { activeSection } = useStoreScroll();

  return (
    <>
      <SideNavigation />

      {/* 1. Atelier (The Brand Anchor) */}
      <StoreSection index={0}>
        <ProductIntro />
      </StoreSection>

      {/* 2. Diversity (Mua sắm đa dạng) */}
      <StoreSection index={1}>
        <DiversitySection />
      </StoreSection>

       {/* 3. Marketplace (Tự do đăng bán) */}
      <StoreSection index={2}>
        <MarketplaceSection />
      </StoreSection>

      {/* 4. Trust (An toàn & Tiện lợi) */}
      <StoreSection index={3}>
        <TrustSection />
      </StoreSection>

      {/* 5. Portal (Entrance to Catalog) */}
      <StoreSection index={4}>
        <CollectionPortal />
      </StoreSection>
    </>
  );
}
