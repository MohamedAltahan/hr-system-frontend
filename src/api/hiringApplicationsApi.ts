import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const hiringApplicationsApi = createApi({
  reducerPath: 'HiringApplicationsApi',
  tagTypes: ['hiringApplication'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    // GET all hiring applications (with optional filters)
    getAllHiringApplications: builder.query<any, { opening_position_id?: number; page?: number }>({
      query: ({ opening_position_id, page }) => {
        const params = new URLSearchParams();
        if (opening_position_id) params.append('opening_position_id', opening_position_id.toString());
        if (page) params.append('page', page.toString());
        return {
          url: `/hiring-applications?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['hiringApplication'],
    }),

    // GET one hiring application
    getHiringApplicationById: builder.query<any, number>({
      query: (id) => ({
        url: `/hiring-applications/${id}`,
        method: 'GET',
      }),
      providesTags: ['hiringApplication'],
    }),

    // DELETE one hiring application
    deleteHiringApplication: builder.mutation<any, number>({
      query: (id) => ({
        url: `/hiring-applications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['hiringApplication'],
    }),

    // Change status of an application
    changeHiringApplicationStatus: builder.mutation<any, { application_id: number; status: string }>({
      query: ({ application_id, status }) => ({
        url: `/hiring-applications/change-status`,
        method: 'POST',
        body: { application_id, status },
      }),
      invalidatesTags: ['hiringApplication'],
    }),
  }),
});

export const {
  useGetAllHiringApplicationsQuery,
  useGetHiringApplicationByIdQuery,
  useDeleteHiringApplicationMutation,
  useChangeHiringApplicationStatusMutation,
} = hiringApplicationsApi;

export default hiringApplicationsApi;
