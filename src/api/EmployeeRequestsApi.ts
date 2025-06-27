import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const employeeRequestsApi = createApi({
  reducerPath: 'EmployeeRequestsApi',
  tagTypes: ['employeeRequest'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // 1. Get all employee requests
    getAllEmployeeRequests: builder.query<any, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: `/employee-requests?page=${page}&per_page=${per_page}`,
        method: 'GET',
      }),
      providesTags: ['employeeRequest'],
    }),

    // 2. Get employee request by ID
    getEmployeeRequestById: builder.query<any, number>({
      query: (id) => ({
        url: `/employee-requests/${id}`,
        method: 'GET',
      }),
      providesTags: ['employeeRequest'],
    }),

    // 3. Create new employee request
    createEmployeeRequest: builder.mutation<any, {
      employee_id: number;
      reason: string;
      leave_type:string,
      type: string; // e.g., 'leave', 'vacation'
      from_date: string; // format: YYYY-MM-DD
      to_date: string;   // format: YYYY-MM-DD
    }>({
      query: ({ employee_id, reason, type, from_date, to_date,leave_type }) => ({
        url: `/employee-requests`,
        method: 'POST',
        body: {
          employee_id,
          reason,
          type,
          from_date,
          to_date,
          leave_type,
        },
      }),
      invalidatesTags: ['employeeRequest'],
    }),

    // 4. Update employee request
    updateEmployeeRequest: builder.mutation<any, {
      id: number;
      body: {
        employee_id: number;
        reason: string;
        type: string;
        from_date: string;
        to_date: string;
        leave_type:string
      };
    }>({
      query: ({ id, body }) => ({
        url: `/employee-requests/${id}?_method=put`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['employeeRequest'],
    }),

    // 5. Delete employee request
    deleteEmployeeRequest: builder.mutation<any, number>({
      query: (id) => ({
        url: `/employee-requests/${id}?_method=put`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employeeRequest'],
    }),


    updateEmployeeRequestStatus: builder.mutation({
  query: ({ id, status, manager_comment }) => ({
    url: `/employee-request-update-status/${id}?_method=put`,
    method: "POST",
    body: {
      status,
      manager_comment,
    },
  }),
  invalidatesTags: ["employeeRequest"],
}),
getEmployeeRequestTypes: builder.query<any, void>({
  query: () => ({
    url: `/employee-request-type-list`,
    method: 'GET',
  }),
  providesTags: ['employeeRequest'],
}),

  }),
});

export const {
  useGetAllEmployeeRequestsQuery,
  useGetEmployeeRequestByIdQuery,
  useCreateEmployeeRequestMutation,
  useUpdateEmployeeRequestMutation,
  useDeleteEmployeeRequestMutation,
  useUpdateEmployeeRequestStatusMutation,
    useGetEmployeeRequestTypesQuery, 
} = employeeRequestsApi;

export default employeeRequestsApi;
