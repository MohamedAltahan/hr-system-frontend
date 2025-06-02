import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Utility to build dynamic subdomain-based base URL
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts[0] : 'admin';

  return `https://${subdomain}.${baseDomain}`;
};

const jobTitlesApi = createApi({
  reducerPath: 'JobTitlesApi',

  tagTypes: ['jobTitle'],
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
    getAllJobTitles: builder.query<any, void>({
      query: () => ({
        url: `/job-titles`,
        method: 'GET',
      }),
      providesTags: ['jobTitle'],
    }),
  }),
});

export const { useGetAllJobTitlesQuery } = jobTitlesApi;
export default jobTitlesApi;
