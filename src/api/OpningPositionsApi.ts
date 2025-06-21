import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const openingPositionsApi = createApi({
  reducerPath: 'OpeningPositionsApi',

  tagTypes: ['openingPosition'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllOpeningPositions: builder.query<any, { name?: string; page?: number }>({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (page) params.append('page', page.toString());
        return {
          url: `/opening-positions?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['openingPosition'],
    }),

    getOpeningPositionById: builder.query<any, number>({
      query: (id) => ({
        url: `/opening-positions/${id}`,
        method: 'GET',
      }),
      providesTags: ['openingPosition'],
    }),

    createOpeningPosition: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/opening-positions',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['openingPosition'],
    }),

    updateOpeningPosition: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/opening-positions/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['openingPosition'],
    }),

    deleteOpeningPosition: builder.mutation<any, number>({
      query: (id) => ({
        url: `/opening-positions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['openingPosition'],
    }),
  }),
});

export const {
  useGetAllOpeningPositionsQuery,
  useGetOpeningPositionByIdQuery,
  useCreateOpeningPositionMutation,
  useUpdateOpeningPositionMutation,
  useDeleteOpeningPositionMutation,
} = openingPositionsApi;

export default openingPositionsApi;
