// src/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts[0] : 'admin';

  return `https://${subdomain}.${baseDomain}`;
};

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getDynamicBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
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
