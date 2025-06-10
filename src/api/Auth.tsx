// src/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed


const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    Adminlogin: builder.mutation<any, any>({
  query: (formData) => ({
    url: `/login`,
    method: 'POST',
    body: formData,
    // 👇 meta field to carry company name
    headers: {
      'X-Company': formData.company_name, // custom header from formData
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
  }),
  transformResponse: (response, meta) => ({
    status: meta?.response?.status,
    response,
  }),
  transformErrorResponse: (response, meta) => ({
    status: meta?.response?.status,
    response,
  }),
}),

    ChangePassword: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/api/change-password`,
        method: 'POST',
        body: formData,
      }),
    }),
    checkEmail: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/email-check`,
        method: 'POST',
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useAdminloginMutation,
  useChangePasswordMutation,
  useCheckEmailMutation,
} = authApi;

export default authApi;
