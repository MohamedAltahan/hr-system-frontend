// src/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { prepareHeaders } from './common/prepareHeaders'; // ✅ same as other services

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders, // ✅ shared headers logic
  }),
  endpoints: (builder) => ({
    Adminlogin: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/login`,
        method: 'POST',
        body: formData,
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
