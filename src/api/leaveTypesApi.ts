import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const leaveTypesApi = createApi({
  reducerPath: 'LeaveTypesApi',
  tagTypes: ['leaveType'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // 1. Get all leave types
    getAllLeaveTypes: builder.query<any, void>({
      query: () => ({
        url: `/leaves-type-list`,
        method: 'GET',
      }),
      providesTags: ['leaveType'],
    }),

    // 2. Get leave type by ID
    getLeaveTypeById: builder.query<any, number>({
      query: (id) => ({
        url: `/leave-types/${id}`,
        method: 'GET',
      }),
      providesTags: ['leaveType'],
    }),

    // 3. Create leave type
    createLeaveType: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/leave-types',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['leaveType'],
    }),

    // 4. Update leave type
    updateLeaveType: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/leave-types/${id}?_method=put`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['leaveType'],
    }),

    // 5. Delete leave type
    deleteLeaveType: builder.mutation<any, number>({
      query: (id) => ({
        url: `/leave-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['leaveType'],
    }),
  }),
});

export const {
  useGetAllLeaveTypesQuery,
  useGetLeaveTypeByIdQuery,
  useCreateLeaveTypeMutation,
  useUpdateLeaveTypeMutation,
  useDeleteLeaveTypeMutation,
} = leaveTypesApi;

export default leaveTypesApi;
