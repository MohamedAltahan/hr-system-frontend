import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 🔁 Utility to construct dynamic subdomain-based base URL
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  let subdomain = 'admin'; // fallback
  if (parts.length > 2) {
    subdomain = parts[0];
  }

  return `https://${subdomain}.${baseDomain}`;
};

const permissionsApi = createApi({
  reducerPath: 'PermissionsApi',
  tagTypes: ['permission'],
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
    // 1. Get all permissions
    getAllPermissions: builder.query<any, { name?: string; page?: number } | void>({
      query: (params) => {
        const urlParams = new URLSearchParams();
        if (params?.name) urlParams.append('name', params.name);
        if (params?.page) urlParams.append('page', params.page.toString());

        return {
          url: `/permission?${urlParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['permission'],
    }),

    // 2. Get single permission by ID
    getPermissionById: builder.query<any, number>({
      query: (id) => ({
        url: `/permission/${id}`,
        method: 'GET',
      }),
      providesTags: ['permission'],
    }),

    // 3. Create new permission
    createPermission: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/permission',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['permission'],
    }),

    // 4. Update permission
    updatePermission: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/permission/${id}`,
        method: 'POST', // Laravel uses _method=PUT in formData
        body: formData,
      }),
      invalidatesTags: ['permission'],
    }),

    // 5. Delete permission
    deletePermission: builder.mutation<any, number>({
      query: (id) => ({
        url: `/permission/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['permission'],
    }),
  }),
});

export const {
  useGetAllPermissionsQuery,
  useGetPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionsApi;

export default permissionsApi;
