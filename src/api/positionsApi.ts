import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite

const positionsApi = createApi({
  reducerPath: 'PositionsApi',
  tagTypes: ['position'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
