import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite

const departmentsApi = createApi({
  reducerPath: 'DepartmentsApi',
  tagTypes: ['department'],
  baseQuery: fetchBaseQuery({
    baseUrl : baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'ar');  // fallback to 'ar'
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get all departments
    getAllDepartments: builder.query<any, void>({
      query: () => ({
        url: '/department',
        method: 'GET',
      }),
      providesTags: ['department'],
    }),

    // Get a department by ID (number or string)
    getDepartmentById: builder.query<any, number | string>({
      query: (id) => ({
        url: `/department/${id}`,
        method: 'GET',
      }),
      providesTags: ['department'],
    }),

    // Create a new department
    createDepartment: builder.mutation<any, Record<string, any>>({
      query: (newDepartment) => ({
        url: '/department',
        method: 'POST',
        body: newDepartment,
      }),
      invalidatesTags: ['department'],
    }),

    // Update a department by ID
    updateDepartment: builder.mutation<any, { id: number | string; data: Record<string, any> }>({
      query: ({ id, data }) => ({
        url: `/department/${id}`,
        method: 'POST', // Change to PUT/PATCH if backend requires it
        body: data,
      }),
      invalidatesTags: ['department'],
    }),

    // Delete a department by ID
    deleteDepartment: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/department/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['department'],
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;

export default departmentsApi;
