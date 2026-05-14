'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  /* Khởi tạo QueryClient với các cấu hình mặc định cho việc nạp dữ liệu */
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Dữ liệu sẽ được coi là 'tươi' trong 1 phút, giúp giảm số lượng gọi API dư thừa
        staleTime: 60 * 1000,
        // Không tự động tải lại dữ liệu khi người dùng chuyển tab và quay lại App
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    /* Cung cấp QueryClient cho toàn bộ các Component con bên trong */
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

