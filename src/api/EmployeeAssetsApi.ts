import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const employeeAssetsApi = createApi({
  reducerPath: 'EmployeeAssetsApi',
  tagTypes: ['employeeAsset'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // 1. Get all employee assets
    getAllEmployeeAssets: builder.query<any, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: `/employee-assets?page=${page}&per_page=${per_page}`,
        method: 'GET',
      }),
      providesTags: ['employeeAsset'],
    }),

    // 2. Get employee asset by ID
    getEmployeeAssetById: builder.query<any, number>({
      query: (id) => ({
        url: `/employee-assets/${id}`,
        method: 'GET',
      }),
      providesTags: ['employeeAsset'],
    }),

    // 3. Create employee asset
    createEmployeeAsset: builder.mutation<any, {
      manager_id: number;
      employee_id: number;
      employee_asset_type_id: number;
      department_id: number;
      issue_date: string; // "YYYY-MM-DD"
      return_date: string; // "YYYY-MM-DD"
      status: string; // e.g., "pending", "returned"
    }>({
      query: (body) => ({
        url: `/employee-assets`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['employeeAsset'],
    }),

    // 4. Update employee asset
  updateEmployeeAsset: builder.mutation<any, { id: number; formData: FormData }>({
  query: ({ id, formData }) => ({
    url: `/employee-assets/${id}?_method=put`,
    method: 'POST',
    body: formData,
  }),
  invalidatesTags: ['employeeAsset'],
}),


    // 5. Delete employee asset
    deleteEmployeeAsset: builder.mutation<any, number>({
      query: (id) => ({
        url: `/employee-assets/${id}?_method=delete`,
        method: 'POST',
      }),
      invalidatesTags: ['employeeAsset'],
    }),

 

    // 6. Get all asset statuses (static, or from endpoint if needed)
    getAssetStatuses: builder.query<any, void>({
      query: () => ({
        url: '/asset-statuses',
        method: 'GET',
      }),
      providesTags: ['employeeAsset'], // optional
    }),
  }),
});

export const {
  useGetAllEmployeeAssetsQuery,
  useGetEmployeeAssetByIdQuery,
  useCreateEmployeeAssetMutation,
  useUpdateEmployeeAssetMutation,
  useDeleteEmployeeAssetMutation,
  useGetAssetStatusesQuery,
} = employeeAssetsApi;

export default employeeAssetsApi;
