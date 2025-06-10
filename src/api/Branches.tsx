import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite

const branchesApi = createApi({
  reducerPath: 'BranchesApi',

  tagTypes: ['branch'],

  baseQuery: fetchBaseQuery({
    baseUrl : baseUrl,
    prepareHeaders
  }),

  endpoints: (builder) => ({
    getAllbranches: builder.query<any, { name?: string; page?: number }>({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (page) params.append('page', page.toString());
        return {
          url: `/branch?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['branch'],
    }),

    getBranchById: builder.query<any, number>({
      query: (id) => ({
        url: `/branch/${id}`,
        method: 'GET',
      }),
      providesTags: ['branch'],
    }),

    createBranch: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/branch',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['branch'],
    }),

    updateBranch: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/branch/${id}?_method=PUT`,
        method: 'POST', // Laravel with _method=PUT
        body: formData,
      }),
      invalidatesTags: ['branch'],
    }),

    deleteBranch: builder.mutation<any, number>({
      query: (id) => ({
        url: `/branch/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['branch'],
    }),
  }),
});

export const {
  useGetAllbranchesQuery,
  useGetBranchByIdQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchesApi;

export default branchesApi;
