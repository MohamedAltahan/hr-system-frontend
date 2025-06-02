import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 👇 Dynamic base URL logic
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname; // e.g., "admin.alkholoudhr.com"

  const parts = hostname.split('.');
  let subdomain = 'admin'; // default if no subdomain

  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
};

const tenantApi = createApi({
  reducerPath: 'tenantApi',
  tagTypes: ['tenant'],

  baseQuery: fetchBaseQuery({
    baseUrl: getDynamicBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'en');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
      return headers;
    },
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
  }),
});

export const {
  useGetAllTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
} = tenantApi;

export default tenantApi;
