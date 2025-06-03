import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite

const branchesApi = createApi({
  reducerPath: 'BranchesApi',

  tagTypes: ['branch'],

  baseQuery: fetchBaseQuery({
    baseUrl : baseUrl,
    prepareHeaders: (headers) => {
      const lang = localStorage.getItem('lang');
      const token = localStorage.getItem('HrSystem');

      if (lang) headers.set('Lang', lang);
      if (token) headers.set('Authorization', `Bearer ${token}`);

      headers.set('Accept', 'application/json');
      return headers;
    },
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
