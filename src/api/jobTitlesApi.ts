import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed



const jobTitlesApi = createApi({
  reducerPath: 'JobTitlesApi',

  tagTypes: ['jobTitle'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders
  }),

  endpoints: (builder) => ({
    getAllJobTitles: builder.query<any, void>({
      query: () => ({
        url: `/job-titles`,
        method: 'GET',
      }),
      providesTags: ['jobTitle'],
    }),
  }),
});

export const { useGetAllJobTitlesQuery } = jobTitlesApi;
export default jobTitlesApi;
