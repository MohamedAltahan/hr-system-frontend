import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 🔁 Dynamic base URL based on subdomain
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g. "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  let subdomain = 'admin'; // default fallback
  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
};

const positionsApi = createApi({
  reducerPath: 'PositionsApi',
  tagTypes: ['position'],
  baseQuery: fetchBaseQuery({
    baseUrl: getDynamicBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'ar');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllPositions: builder.query<any, void>({
      query: () => ({
        url: `/position`,
        method: 'GET',
      }),
      providesTags: ['position'],
    }),
  }),
});

export const { useGetAllPositionsQuery } = positionsApi;
export default positionsApi;
