'use client';

import { useState, useRef } from 'react';

/**
 * useStoreScroll: Quản lý trạng thái và hành vi cuộn snap-scroll cho Store.
 * Hook này giúp theo dõi section nào đang hiện ở giữa màn hình và hỗ trợ cuộn mượt mà.
 */
export const useStoreScroll = () => {
  // Chỉ số section hiện tại (0: Hero, 1: Product Grid, 2: Footer)
  const [activeSection, setActiveSection] = useState(0);
  
  // Tham chiếu đến container cuộn chính để điều khiển vị trí cuộn
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * handleScroll: Tính toán section đang hiển thị dựa trên vị trí cuộn hiện tại.
   * Logic: Lấy vị trí cuộn chia cho chiều cao một section và làm tròn.
   */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const index = Math.round(scrollTop / height);
    
    // Chỉ cập nhật state nếu chỉ số section thực sự thay đổi
    if (index !== activeSection) {
      setActiveSection(index);
    }
  };

  /**
   * scrollToSection: Hàm hỗ trợ cuộn mượt mà đến một trang cụ thể.
   * Dùng cho Side Navigation (dấu chấm) và Mega Menu.
   */
  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: index * scrollContainerRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  return { activeSection, scrollContainerRef, handleScroll, scrollToSection };
};
