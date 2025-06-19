import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const employeeAssetTypesApi = createApi({
  reducerPath: 'EmployeeAssetTypesApi',
  tagTypes: ['employeeAssetType'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllEmployeeAssetTypes: builder.query<any, { name?: string; page?: number }>({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (page) params.append('page', page.toString());
        return {
          url: `/employee-asset-types?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['employeeAssetType'],
    }),

    getEmployeeAssetTypeById: builder.query<any, number>({
      query: (id) => ({
        url: `/employee-asset-types/${id}`,
        method: 'GET',
      }),
      providesTags: ['employeeAssetType'],
    }),

  createEmployeeAssetType: builder.mutation<any, FormData>({
  query: (formData) => ({
    url: '/employee-asset-types',
    method: 'POST',
    body: formData,
  }),
  invalidatesTags: ['employeeAssetType'],
}),


    updateEmployeeAssetType: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/employee-asset-types/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['employeeAssetType'],
    }),

    deleteEmployeeAssetType: builder.mutation<any, number>({
      query: (id) => ({
        url: `/employee-asset-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeAssetType'],
    }),
  }),
});

export const {
  useGetAllEmployeeAssetTypesQuery,
  useGetEmployeeAssetTypeByIdQuery,
  useCreateEmployeeAssetTypeMutation,
  useUpdateEmployeeAssetTypeMutation,
  useDeleteEmployeeAssetTypeMutation,
} = employeeAssetTypesApi;

export default employeeAssetTypesApi;
