import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enabled experimentally for the Nyxoris Fluid Transition UI
  experimental: {
    viewTransition: true
  }
};

export default withNextIntl(nextConfig);
