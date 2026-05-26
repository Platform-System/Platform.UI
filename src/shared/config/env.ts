export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.nyxoris.com',
  KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'https://auth.nyxoris.com',
  KEYCLOAK_REALM: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'platform',
  KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'platform-web',
};

