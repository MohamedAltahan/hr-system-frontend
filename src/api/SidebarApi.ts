import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite


const SidebarApi = createApi({
  reducerPath: 'SidebarApi',
  tagTypes: ['Sidebar'],

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
