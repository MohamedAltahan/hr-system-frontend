import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SidebarApi = createApi({
  reducerPath: 'SidebarApi',
  tagTypes: ['Sidebar'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getSidebarServices: builder.query<any, void>({
      query: () => ({
        url: '/sidebar',
        method: 'GET',
      }),
      providesTags: ['Sidebar'],
    }),
  }),
});

export const { useGetSidebarServicesQuery } = SidebarApi;
export default SidebarApi;
