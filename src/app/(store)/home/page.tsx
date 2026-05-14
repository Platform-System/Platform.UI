import { redirect } from '@/i18n/navigation';

/**
 * Legacy alias for the canonical `/store` landing page.
 */
export default function AllProductsPage() {
  redirect('/');
}
