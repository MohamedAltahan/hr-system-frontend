import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite


const Self_ServicesApi = createApi({
  reducerPath: 'Self_ServicesApi',
  tagTypes: ['Self_Services', 'request', 'attendance'],

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', 'ar');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
                  headers.set('X-Company',localStorage.getItem('X-Company') || 'default_company');

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllServices: builder.query<any, { id: number }>({
      query: ({ id }) => ({
        url: `/api/Self_services?Id=${id}`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllPersonlaData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-profile`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllFinancialData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-financial-services`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllEvalutionsData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-evaluations`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllTasksData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-tasks`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllReportsData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-reports`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllDisciplinaryproceduresData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-disciplinary-actions`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllReceiptsData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-salary`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllDocumentariesData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-documents`,
        method: 'GET',
      }),
      providesTags: ['Self_Services'],
    }),

    getAllRequestData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-requests`,
        method: 'GET',
      }),
      providesTags: ['Self_Services', 'request'],
    }),

    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/api/requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['request'],
    }),

    add_Request: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/api/requests`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['request'],
    }),

    getAllAttendanceData: builder.query<any, any>({
      query: () => ({
        url: `/api/my-attendances`,
        method: 'GET',
      }),
      providesTags: ['Self_Services', 'attendance'],
    }),

    add_AttendeRequest: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/api/attendances/record`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['attendance'],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetAllPersonlaDataQuery,
  useGetAllFinancialDataQuery,
  useGetAllDocumentariesDataQuery,
  useGetAllAttendanceDataQuery,
  useGetAllReportsDataQuery,
  useGetAllDisciplinaryproceduresDataQuery,
  useGetAllReceiptsDataQuery,
  useGetAllRequestDataQuery,
  useGetAllTasksDataQuery,
  useGetAllEvalutionsDataQuery,
  useAdd_RequestMutation,
  useAdd_AttendeRequestMutation,
  useDeleteRequestMutation,
} = Self_ServicesApi;

export default Self_ServicesApi;
