import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const attendanceDepartmentRequestsApi = createApi({
  reducerPath: 'AttendanceDepartmentRequestsApi',
  tagTypes: ['attendanceDepartmentRequests'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // 🟢 GET all attendance department requests (with optional pagination)
    getAllAttendanceDepartmentRequests: builder.query<any, { page?: number }>({
      query: ({ page = 1 }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        return {
          url: `/attendance-departure-requests?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['attendanceDepartmentRequests'],
    }),

    // 🟢 GET single request by ID
    getAttendanceDepartmentRequestById: builder.query<any, number | string>({
      query: (id) => ({
        url: `/attendance-departure-requests/${id}`,
        method: 'GET',
      }),
      providesTags: ['attendanceDepartmentRequests'],
    }),

    // 🟠 UPDATE status (via POST + _method=put)
    updateAttendanceDepartmentRequestStatus: builder.mutation<
      any,
      { id: number | string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/employee-request-update-status/${id}?_method=put`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['attendanceDepartmentRequests'],
    }),

    // 🔴 DELETE a request
    deleteAttendanceDepartmentRequest: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/attendance-departure-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['attendanceDepartmentRequests'],
    }),
  }),
});

export const {
  useGetAllAttendanceDepartmentRequestsQuery,
  useGetAttendanceDepartmentRequestByIdQuery,
  useUpdateAttendanceDepartmentRequestStatusMutation,
  useDeleteAttendanceDepartmentRequestMutation,
} = attendanceDepartmentRequestsApi;

export default attendanceDepartmentRequestsApi;
