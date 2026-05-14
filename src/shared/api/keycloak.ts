import Keycloak from 'keycloak-js';
import { ENV } from '@/shared/config/env';

// Khởi tạo Keycloak instance duy nhất
export const keycloak = typeof window !== 'undefined' 
  ? new Keycloak({
      url: ENV.KEYCLOAK_URL,
      realm: ENV.KEYCLOAK_REALM,
      clientId: ENV.KEYCLOAK_CLIENT_ID,
    }) 
  : null;

/**
 * Hàm hỗ trợ lấy Token hiện tại.
 * Tự động cập nhật nếu token sắp hết hạn.
 */
export async function getValidToken(): Promise<string | undefined> {
  // Chỉ cập nhật nếu Keycloak đã khởi tạo, người dùng đã đăng nhập và có token
  if (!keycloak || !keycloak.authenticated) {
    return undefined;
  }

  try {
    // Nếu token còn hạn ít hơn 30 giây, tự động refresh
    await keycloak.updateToken(30);
    return keycloak.token;
  } catch (error) {
    console.error('Không thể cập nhật Token:', error);
    return undefined;
  }
}

