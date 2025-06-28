import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const attendanceDepartureApi = createApi({
  reducerPath: 'AttendanceDepartureApi',
  tagTypes: ['attendanceDeparture'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllAttendanceDeparture: builder.query<any, { page?: number }>({
      query: ({ page = 1 }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());

        return {
          url: `/attendance-departure?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['attendanceDeparture'],
    }),

    getAttendanceDepartureById: builder.query<any, number | string>({
      query: (id) => ({
        url: `/attendance-departure/${id}`,
        method: 'GET',
      }),
      providesTags: ['attendanceDeparture'],
    }),

    createAttendanceDeparture: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/attendance-departure',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['attendanceDeparture'],
    }),

    updateAttendanceDeparture: builder.mutation<any, { id: number | string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/attendance-departure/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['attendanceDeparture'],
    }),

    deleteAttendanceDeparture: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/attendance-departure/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['attendanceDeparture'],
    }),
  }),
});

export const {
  useGetAllAttendanceDepartureQuery,
  useGetAttendanceDepartureByIdQuery,
  useCreateAttendanceDepartureMutation,
  useUpdateAttendanceDepartureMutation,
  useDeleteAttendanceDepartureMutation,
} = attendanceDepartureApi;

export default attendanceDepartureApi;
