import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // Adjust path if needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const financialTransactionsApi = createApi({
  reducerPath: 'FinancialTransactionsApi',
  tagTypes: ['financial-transactions'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllFinancialTransactions: builder.query<
      any,
      { employee_id?: number; page?: number; type?: string }
    >({
      query: ({ employee_id, page, type }) => {
        const params = new URLSearchParams();
        if (employee_id) params.append('employee_id', employee_id.toString());
        if (type) params.append('type', type);
        if (page) params.append('page', page.toString());
        return {
          url: `/financial-transactions?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['financial-transactions'],
    }),

    getFinancialTransactionById: builder.query<any, number>({
      query: (id) => ({
        url: `/financial-transactions/${id}`,
        method: 'GET',
      }),
      providesTags: ['financial-transactions'],
    }),

    createFinancialTransaction: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/financial-transactions',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['financial-transactions'],
    }),

    updateFinancialTransaction: builder.mutation<
      any,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/financial-transactions/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['financial-transactions'],
    }),

    deleteFinancialTransaction: builder.mutation<any, number>({
      query: (id) => ({
        url: `/financial-transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['financial-transactions'],
    }),
  }),
});

export const {
  useGetAllFinancialTransactionsQuery,
  useGetFinancialTransactionByIdQuery,
  useCreateFinancialTransactionMutation,
  useUpdateFinancialTransactionMutation,
  useDeleteFinancialTransactionMutation,
} = financialTransactionsApi;

export default financialTransactionsApi;
