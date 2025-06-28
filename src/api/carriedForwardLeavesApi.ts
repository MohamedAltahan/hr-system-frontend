import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const carriedForwardLeavesApi = createApi({
  reducerPath: 'carriedForwardLeavesApi',
  tagTypes: ['CarriedForwardLeaves'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // ✅ Get all carried-forward leaves
    getAllCarriedForwardLeaves: builder.query({
      query: ({ page = 1, per_page = 10 } = {}) => ({
        url: `carried-forward-leaves?page=${page}&per_page=${per_page}`,
        method: 'GET',
      }),
      providesTags: ['CarriedForwardLeaves'],
    }),

    // ✅ Get single carried-forward leave by ID
    getCarriedForwardLeaveById: builder.query({
      query: (id) => ({
        url: `carried-forward-leaves/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'CarriedForwardLeaves', id }],
    }),

    // ✅ Create new carried-forward leave
    createCarriedForwardLeave: builder.mutation({
      query: (payload) => ({
        url: `carried-forward-leaves`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['CarriedForwardLeaves'],
    }),

    // ✅ Update existing carried-forward leave
    updateCarriedForwardLeave: builder.mutation({
      query: ({ id, payload }) => ({
        url: `carried-forward-leaves/${id}?_method=PUT`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['CarriedForwardLeaves'],
    }),

    // ✅ Delete carried-forward leave
    deleteCarriedForwardLeave: builder.mutation({
      query: (id) => ({
        url: `carried-forward-leaves/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CarriedForwardLeaves'],
    }),
  }),
});

export const {
  useGetAllCarriedForwardLeavesQuery,
  useGetCarriedForwardLeaveByIdQuery,
  useCreateCarriedForwardLeaveMutation,
  useUpdateCarriedForwardLeaveMutation,
  useDeleteCarriedForwardLeaveMutation,
} = carriedForwardLeavesApi;

export default carriedForwardLeavesApi;
