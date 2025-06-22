import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const positionsApi = createApi({
  reducerPath: 'PositionsApi',
  tagTypes: ['position'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // 1. Get all positions
    getAllPositions: builder.query<any, void>({
      query: () => ({
        url: `/position`,
        method: 'GET',
      }),
      providesTags: ['position'],
    }),

    // 2. Get a single position by ID
    getPositionById: builder.query<any, number>({
      query: (id) => ({
        url: `/position/${id}`,
        method: 'GET',
      }),
      providesTags: ['position'],
    }),

    // 3. Create a new position
    createPosition: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/position`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['position'],
    }),

    // 4. Update a position (using Laravel's _method=PUT convention)
    updatePosition: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/position/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['position'],
    }),

    // 5. Delete a position
    deletePosition: builder.mutation<any, number>({
      query: (id) => ({
        url: `/position/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['position'],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetAllPositionsQuery,
  useGetPositionByIdQuery,
  useCreatePositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = positionsApi;

export default positionsApi;
