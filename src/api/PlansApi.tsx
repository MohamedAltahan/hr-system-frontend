import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed


const plansApi = createApi({
  reducerPath: 'PlansApi',
  tagTypes: ['plan'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders
  }),

  endpoints: (builder) => ({
    // 1. Get All Plans with optional filters
getAllPlans: builder.query<any, {  page?: number; status?: string; company_id?: number }>({
  query: ({  page, status, company_id }) => {
    const params = new URLSearchParams();
    // if (name) params.append('name', name);
    if (page) params.append('page', page.toString());
    if (status) params.append('status', status);
    if (company_id) params.append('company_id', company_id.toString()); // <-- Add this line

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
    // 6. Assign Plan to Tenant
assignPlanToTenant: builder.mutation<any, { company_id: number; plan_id: number }>({
  query: (data) => ({
    url: '/assign-plan-to-tenant',
    method: 'POST',
    body: data,
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
    useAssignPlanToTenantMutation, 

} = plansApi;

export default plansApi;
