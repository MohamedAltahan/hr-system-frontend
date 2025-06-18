import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const attendanceRulesApi = createApi({
  reducerPath: 'AttendanceRulesApi',

  tagTypes: ['attendanceRule'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllAttendanceRules: builder.query<any, { name?: string; page?: number }>({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (page) params.append('page', page.toString());
        return {
          url: `/attendance-rules?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['attendanceRule'],
    }),

    getAttendanceRuleById: builder.query<any, number>({
      query: (id) => ({
        url: `/attendance-rules/${id}`,
        method: 'GET',
      }),
      providesTags: ['attendanceRule'],
    }),

    createAttendanceRule: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/attendance-rules',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['attendanceRule'],
    }),

    updateAttendanceRule: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/attendance-rules/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['attendanceRule'],
    }),

    deleteAttendanceRule: builder.mutation<any, number>({
      query: (id) => ({
        url: `/attendance-rules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['attendanceRule'],
    }),
  }),
});

export const {
  useGetAllAttendanceRulesQuery,
  useGetAttendanceRuleByIdQuery,
  useCreateAttendanceRuleMutation,
  useUpdateAttendanceRuleMutation,
  useDeleteAttendanceRuleMutation,
} = attendanceRulesApi;

export default attendanceRulesApi;
