import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  tagTypes: ['subscription'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),

  endpoints: (builder) => ({
    getSubscriptionsByTenantId: builder.query<any, number>({
      query: (tenantId) => ({
        url: `/subscriptions/${tenantId}`,
        method: 'GET',
      }),
      providesTags: ['subscription'],
    }),
    createSubscription: builder.mutation<any, any>({
  query: (subscriptionData) => ({
    url: `/subscriptions`,
    method: 'POST',
    body: subscriptionData,
  }),
  invalidatesTags: ['subscription'],
}),


    // Add other endpoints if needed:
    // createSubscription, updateSubscription, deleteSubscription, etc.
  }),
});

export const {
  useGetSubscriptionsByTenantIdQuery,
  useCreateSubscriptionMutation,
} = subscriptionsApi;

export default subscriptionsApi;
