// src/utils/getDynamicBaseUrl.ts
export function getDynamicBaseUrl() {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname; // e.g., "admin.alkholoudhr.com"

  const parts = hostname.split('.');
  let subdomain = 'admin'; // default subdomain

  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
}
