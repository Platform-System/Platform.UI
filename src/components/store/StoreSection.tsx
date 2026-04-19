'use client';

import React from 'react';

interface StoreSectionProps {
  children: React.ReactNode;
  className?: string;
  isOverflowHidden?: boolean;
}

/**
 * StoreSection: Wrapper chuẩn cho từng phân đoạn (trang) trong Store.
 * Đảm bảo các section có độ cao full màn hình và bắt đúng điểm dừng khi cuộn (snap-start).
 */
export const StoreSection = ({ 
  children, 
  className = "", 
  isOverflowHidden = false 
}: StoreSectionProps) => {
  return (
    <section 
      className={`h-full w-full snap-start snap-always shrink-0 relative ${isOverflowHidden ? 'overflow-hidden' : ''} ${className}`}
    >
      {children}
    </section>
  );
};
