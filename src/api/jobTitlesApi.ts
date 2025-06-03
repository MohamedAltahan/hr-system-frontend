import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite


const jobTitlesApi = createApi({
  reducerPath: 'JobTitlesApi',

  tagTypes: ['jobTitle'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'ar');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
                  headers.set('X-Company',localStorage.getItem('X-Company') || 'default_company');

      return headers;
    },
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
