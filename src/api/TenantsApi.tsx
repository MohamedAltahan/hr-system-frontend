import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed


const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite

const tenantApi = createApi({
  reducerPath: 'tenantApi',
  tagTypes: ['tenant'],

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders
  }),

  endpoints: (builder) => ({
    // 1. Get all tenants
    getAllTenants: builder.query<any, { name?: string; page?: number }>({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (page) params.append('page', page.toString());

        return {
          url: `/tenant?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['tenant'],
    }),

    // 2. Get tenant by ID
    getTenantById: builder.query<any, number>({
      query: (id) => ({
        url: `/tenant/${id}`,
        method: 'GET',
      }),
      providesTags: ['tenant'],
    }),

    // 3. Create new tenant
    createTenant: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/tenant',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['tenant'],
    }),

    // 4. Update tenant
    updateTenant: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/tenant/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['tenant'],
    }),

    // 5. Delete tenant
    deleteTenant: builder.mutation<any, number>({
      query: (id) => ({
        url: `/tenant/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tenant'],
    }),


    // 6. Disable company
disableCompany: builder.mutation<any, { company_id: number; is_active: 0 | 1 }>({
  query: (payload) => ({
    url: '/disable-company?_method=put',
    method: 'POST',
    body: payload,
  }),
  invalidatesTags: ['tenant'],
}),
// 7. Update tenant password
updateTenantPassword: builder.mutation<any, {
  company_id: number;
  password: string;
  password_confirmation: string;
}>({
  query: (formData) => ({
    url: '/update-password?_method=put',
    method: 'POST', // Laravel expects POST with _method=PUT
    body: formData,
  }),
  invalidatesTags: ['tenant'],
}),


  }),
});

export const {
  useGetAllTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
    useDisableCompanyMutation, 
    useUpdateTenantPasswordMutation

} = tenantApi;

export default tenantApi;
