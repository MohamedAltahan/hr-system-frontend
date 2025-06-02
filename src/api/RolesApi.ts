import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 🔁 Dynamic base URL based on subdomain
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g. "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  let subdomain = 'admin'; // default
  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
};

const RolesApi = createApi({
  reducerPath: 'RolesApi',
  tagTypes: ['Role'],
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
    // Get all roles with pagination
    getAllRoles: builder.query<any, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: per_page.toString(),
        });
        return {
          url: `/role?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Role'],
    }),

    // Get role by ID
    getRoleById: builder.query<any, number>({
      query: (id) => ({
        url: `/role/${id}`,
        method: 'GET',
      }),
      providesTags: ['Role'],
    }),

    // Create new role
    createRole: builder.mutation<any, { title: string; name: string; permissions: number[] }>({
      query: (body) => ({
        url: '/role',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Role'],
    }),

    // Update role
    updateRole: builder.mutation<any, { id: number; body: { title?: string; name?: string; permissions?: number[] } }>({
      query: ({ id, body }) => ({
        url: `/role/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Role'],
    }),

    // Delete role
    deleteRole: builder.mutation<any, number>({
      query: (id) => ({
        url: `/role/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = RolesApi;

export default RolesApi;
