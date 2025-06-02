import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 👇 Utility to get the dynamic base URL
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname; // e.g., "admin.alkholoudhr.com"

  const parts = hostname.split('.');
  let subdomain = 'admin'; // default fallback

  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
};

const SidebarApi = createApi({
  reducerPath: 'SidebarApi',
  tagTypes: ['Sidebar'],

  baseQuery: fetchBaseQuery({
    baseUrl: getDynamicBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'en');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getSidebarServices: builder.query<any, void>({
      query: () => ({
        url: `/sidebar`,
        method: 'GET',
      }),
      providesTags: ['Sidebar'],
    }),
  }),
});

export const { useGetSidebarServicesQuery } = SidebarApi;
export default SidebarApi;
