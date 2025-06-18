import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const employeeContractsApi = createApi({
  reducerPath: 'EmployeeContractsApi',
  tagTypes: ['employeeContract'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllEmployeeContracts: builder.query<any, { page?: number }>({
      query: ({ page }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        return {
          url: `/employee-contracts?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['employeeContract'],
    }),

    getEmployeeContractById: builder.query<any, number>({
      query: (id) => ({
        url: `/employee-contracts/${id}`,
        method: 'GET',
      }),
      providesTags: ['employeeContract'],
    }),

    createEmployeeContract: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/employee-contracts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['employeeContract'],
    }),

    updateEmployeeContract: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/employee-contracts/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['employeeContract'],
    }),

    deleteEmployeeContract: builder.mutation<any, number>({
      query: (id) => ({
        url: `/employee-contracts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeContract'],
    }),
  }),
});

export const {
  useGetAllEmployeeContractsQuery,
  useGetEmployeeContractByIdQuery,
  useCreateEmployeeContractMutation,
  useUpdateEmployeeContractMutation,
  useDeleteEmployeeContractMutation,
} = employeeContractsApi;

export default employeeContractsApi;
