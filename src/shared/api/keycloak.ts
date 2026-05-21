import { configurePlatformApi, getKeycloak, getValidToken as getValidTokenShared } from '@platform/api-client';
import { ENV } from '@/shared/config/env';

configurePlatformApi({
  baseURL: ENV.API_URL,
  keycloak: {
    url: ENV.KEYCLOAK_URL,
    realm: ENV.KEYCLOAK_REALM,
    clientId: ENV.KEYCLOAK_CLIENT_ID,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : undefined,
  },
});

export const keycloak = getKeycloak();

export const getValidToken = getValidTokenShared;


