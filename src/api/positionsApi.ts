import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const positionsApi = createApi({
  reducerPath: 'PositionsApi',
  tagTypes: ['position'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders
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
