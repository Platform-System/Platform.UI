import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Danh sách ngôn ngữ hỗ trợ
  locales: ['en', 'vi'],
  // Ngôn ngữ mặc định
  defaultLocale: 'en'
});

export const config = {
  // Matcher chuẩn cho next-intl
  matcher: ['/', '/(vi|en)/:path*']
};
