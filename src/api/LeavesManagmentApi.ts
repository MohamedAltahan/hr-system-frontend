import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const leavesApi = createApi({
  reducerPath: 'leavesApi',
  tagTypes: ['Leaves'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // ✅ Get all leaves
    getAllLeaves: builder.query({
      query: ({ page = 1, per_page = 10 } = {}) => ({
        url: `leaves?page=${page}&per_page=${per_page}`,
        method: 'GET',
      }),
      providesTags: ['Leaves'],
    }),

    // ✅ Get a leave by ID
    getLeaveById: builder.query({
      query: (id) => ({
        url: `leaves/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Leaves', id }],
    }),

    // ✅ Delete a leave
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `leaves/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Leaves'],
    }),
  }),
});

export const {
  useGetAllLeavesQuery,
  useGetLeaveByIdQuery,
  useDeleteLeaveMutation,
} = leavesApi;

export default leavesApi;
