'use client';

import * as React from 'react';

// Manual Theme Provider to avoid next-themes script injection errors in React 19
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

/* Khởi tạo Context để quản lý Theme (Sáng/Tối/Hệ thống) áp dụng cho toàn bộ App */
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('dark');

  /* Hàm thay đổi Theme và lưu vào LocalStorage để ghi nhớ lựa chọn của người dùng */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  /* Effect xử lý việc áp dụng class 'dark' vào thẻ html và lắng nghe thay đổi từ hệ điều hành */
  React.useEffect(() => {
    // Đọc Theme đã lưu từ lần trước
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(savedTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Hàm thực thi việc áp dụng màu sắc dựa trên lựa chọn hoặc cài đặt hệ thống
    const applyTheme = () => {
      const currentTheme = localStorage.getItem('theme') as Theme || 'system';
      const isDark = 
        currentTheme === 'dark' || 
        (currentTheme === 'system' && mediaQuery.matches);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
        setResolvedTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        setResolvedTheme('light');
      }
    };

    applyTheme();
    // Lắng nghe nếu người dùng đổi theme trong cài đặt Windows/macOS
    mediaQuery.addEventListener('change', applyTheme);
    
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
