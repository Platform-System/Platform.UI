'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface StoreScrollContextType {
  activeSection: number;
  setActiveSection: (index: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  scrollToSection: (index: number) => void;
}

const StoreScrollContext = createContext<StoreScrollContextType | undefined>(undefined);

export const StoreScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset active section when navigating between pages
  useEffect(() => {
    setActiveSection(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    if (height === 0) return;
    const index = Math.round(scrollTop / height);
    if (index !== activeSection) {
      setActiveSection(index);
    }
  };

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: index * scrollContainerRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <StoreScrollContext.Provider value={{ activeSection, setActiveSection, scrollContainerRef, handleScroll, scrollToSection }}>
      {children}
    </StoreScrollContext.Provider>
  );
};

export const useStoreScroll = () => {
  const context = useContext(StoreScrollContext);
  if (!context) {
    throw new Error('useStoreScroll must be used within a StoreScrollProvider');
  }
  return context;
};
