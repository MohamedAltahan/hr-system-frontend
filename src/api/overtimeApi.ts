import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // Adjust path if needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const overtimeApi = createApi({
  reducerPath: 'OvertimeApi',
  tagTypes: ['overtime'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllOvertimes: builder.query<any, { employee_id?: number; page?: number; status?: string }>({
      query: ({ employee_id, page, status }) => {
        const params = new URLSearchParams();
        if (employee_id) params.append('employee_id', employee_id.toString());
        if (status) params.append('status', status);
        if (page) params.append('page', page.toString());
        return {
          url: `/overtime?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['overtime'],
    }),

    getOvertimeById: builder.query<any, number>({
      query: (id) => ({
        url: `/overtime/${id}`,
        method: 'GET',
      }),
      providesTags: ['overtime'],
    }),

    createOvertime: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/overtime',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['overtime'],
    }),

    updateOvertime: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/overtime/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['overtime'],
    }),

    deleteOvertime: builder.mutation<any, number>({
      query: (id) => ({
        url: `/overtime/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['overtime'],
    }),
  }),
});

export const {
  useGetAllOvertimesQuery,
  useGetOvertimeByIdQuery,
  useCreateOvertimeMutation,
  useUpdateOvertimeMutation,
  useDeleteOvertimeMutation,
} = overtimeApi;

export default overtimeApi;
