import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  tagTypes: ['subscription'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const lang = localStorage.getItem('lang');
      const token = localStorage.getItem('HrSystem');
      const company = localStorage.getItem('X-Company') || 'default_company';

      if (lang) headers.set('Lang', lang);
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      headers.set('X-Company', company);

      return headers;
    },
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
