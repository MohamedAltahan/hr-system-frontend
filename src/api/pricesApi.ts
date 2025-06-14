import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // Adjust the path if needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const PricesApi = createApi({
  reducerPath: 'PricesApi',
  tagTypes: ['Price', 'Currency'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    // 1. Get list of available currencies
    getCurrencies: builder.query<any, void>({
      query: () => ({
        url: '/get-currencies',
        method: 'GET',
      }),
      providesTags: ['Currency'],
    }),

    // 2. Get prices for a specific company
    getPricesByCompanyId: builder.query<any, number>({
      query: (company_id) => ({
        url: `/prices?company_id=${company_id}`,
        method: 'GET',
      }),
      providesTags: ['Price'],
    }),

    // 3. Assign a price to a company
    assignPriceToCompany: builder.mutation<
      any,
      { company_id: number; price: number; currency_code: string; duration_in_months: number }
    >({
      query: (body) => ({
        url: '/assign-price-to-company',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Price'],
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useGetPricesByCompanyIdQuery,
  useAssignPriceToCompanyMutation,
} = PricesApi;

export default PricesApi;
