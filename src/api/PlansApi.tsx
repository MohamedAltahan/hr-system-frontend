import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 🔁 Get base domain from environment
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // Example: "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  let subdomain = 'admin'; // fallback subdomain
  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
};

const plansApi = createApi({
  reducerPath: 'PlansApi',
  tagTypes: ['plan'],
  baseQuery: fetchBaseQuery({
    baseUrl: getDynamicBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'ar');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // 1. Get All Plans with optional filters
    getAllPlans: builder.query<any, { company_id: number; name?: string; page?: number }>({
      query: ({ company_id, name, page }) => {
        const params = new URLSearchParams();
        params.append('company_id', company_id.toString());
        if (name) params.append('name', name);
        if (page) params.append('page', page.toString());

        return {
          url: `/plans?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['plan'],
    }),

    // 2. Get Single Plan by ID
    getPlanById: builder.query<any, number>({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'GET',
      }),
      providesTags: ['plan'],
    }),

    // 3. Create New Plan
    createPlan: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/plans',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['plan'],
    }),

    // 4. Update Plan
    updatePlan: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/plans/${id}`,
        method: 'POST', // Laravel uses _method=PUT in FormData
        body: formData,
      }),
      invalidatesTags: ['plan'],
    }),

    // 5. Delete Plan
    deletePlan: builder.mutation<any, number>({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['plan'],
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useGetPlanByIdQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApi;

export default plansApi;
