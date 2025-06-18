import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const employeeClearancesApi = createApi({
  reducerPath: 'EmployeeClearancesApi',
  tagTypes: ['employeeClearance'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllEmployeeClearances: builder.query<any, { page?: number }>({
      query: ({ page }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        return {
          url: `/employee-clearances?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['employeeClearance'],
    }),

    getEmployeeClearanceById: builder.query<any, number>({
      query: (id) => ({
        url: `/employee-clearances/${id}`,
        method: 'GET',
      }),
      providesTags: ['employeeClearance'],
    }),

    createEmployeeClearance: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/employee-clearances',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['employeeClearance'],
    }),

    updateEmployeeClearance: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/employee-clearances/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['employeeClearance'],
    }),

    deleteEmployeeClearance: builder.mutation<any, number>({
      query: (id) => ({
        url: `/employee-clearances/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeClearance'],
    }),
  }),
});

export const {
  useGetAllEmployeeClearancesQuery,
  useGetEmployeeClearanceByIdQuery,
  useCreateEmployeeClearanceMutation,
  useUpdateEmployeeClearanceMutation,
  useDeleteEmployeeClearanceMutation,
} = employeeClearancesApi;

export default employeeClearancesApi;
