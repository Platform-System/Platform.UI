export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8081',
  KEYCLOAK_REALM: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'platform',
  KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'platform-web',
};

