import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const applyJobApi = createApi({
  reducerPath: 'ApplyJobApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', 'ar');
      return headers;
    },
  }),
  tagTypes: ['ApplyJob'],
  endpoints: (builder) => ({
    getOpeningPositions: builder.query<any[], string>({
      // `companyName` will be passed in as argument
      query: (companyName: string) => ({
        url: '/get-opening-positions-list',
        method: 'GET',
        headers: {
          'X-Company': companyName,
        },
      }),
      providesTags: ['ApplyJob'],
    }),

    submitApplication: builder.mutation<any, { formData: FormData; companyName: string }>({
      query: ({ formData, companyName }) => ({
        url: '/hiring-applications',
        method: 'POST',
        body: formData,
        headers: {
          'X-Company': companyName,
        },
      }),
      invalidatesTags: ['ApplyJob'],
    }),
  }),
});

export const {
  useGetOpeningPositionsQuery,
  useSubmitApplicationMutation,
} = applyJobApi;

export default applyJobApi;
