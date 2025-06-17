import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const jobTitlesApi = createApi({
  reducerPath: 'JobTitlesApi',
  tagTypes: ['jobTitle'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    // 1. Get all job titles
    getAllJobTitles: builder.query<any, void>({
      query: () => ({
        url: `/job-titles`,
        method: 'GET',
      }),
      providesTags: ['jobTitle'],
    }),

    // 2. Get job title by ID
    getJobTitleById: builder.query<any, number>({
      query: (id) => ({
        url: `/job-titles/${id}`,
        method: 'GET',
      }),
      providesTags: ['jobTitle'],
    }),

    // 3. Create job title
    createJobTitle: builder.mutation<any, {
      name: { ar: string; en: string };
    }>({
      query: ({ name }) => ({
        url: '/job-titles',
        method: 'POST',
        body: {
          'name[ar]': name.ar,
          'name[en]': name.ar,
        },
      }),
      invalidatesTags: ['jobTitle'],
    }),

   // Update job title
updateJobTitle: builder.mutation<any, {
  id: number;
  body: {
    name: {
      ar: string;
      en: string;
    };
  };
}>({
  query: ({ id, body }) => ({
    url: `/job-titles/${id}?_method=put`,
    method: 'POST',
    body,
  }),
  invalidatesTags: ['jobTitle'],
}),


    // 5. Delete job title
    deleteJobTitle: builder.mutation<any, number>({
      query: (id) => ({
        url: `/job-titles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jobTitle'],
    }),
  }),
});

export const {
  useGetAllJobTitlesQuery,
  useGetJobTitleByIdQuery,
  useCreateJobTitleMutation,
  useUpdateJobTitleMutation,
  useDeleteJobTitleMutation,
} = jobTitlesApi;

export default jobTitlesApi;
