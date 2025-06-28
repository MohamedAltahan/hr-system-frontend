import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const disciplinaryActionsApi = createApi({
  reducerPath: 'DisciplinaryActionsApi',
  tagTypes: ['disciplinaryAction'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllDisciplinaryActions: builder.query<any, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: `/disciplinary-actions?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['disciplinaryAction'],
    }),

    getDisciplinaryActionById: builder.query<any, number | string>({
      query: (id) => ({
        url: `/disciplinary-actions/${id}`,
        method: 'GET',
      }),
      providesTags: ['disciplinaryAction'],
    }),

    createDisciplinaryAction: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/disciplinary-actions',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['disciplinaryAction'],
    }),

    updateDisciplinaryAction: builder.mutation<any, { id: number | string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/disciplinary-actions/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['disciplinaryAction'],
    }),

    deleteDisciplinaryAction: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/disciplinary-actions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['disciplinaryAction'],
    }),

    // ✅ New List Service
    getDisciplinaryActionsList: builder.query<any, void>({
      query: () => ({
        url: '/disciplinary-actions-list',
        method: 'GET',
      }),
      providesTags: ['disciplinaryAction'],
    }),
  }),
});

export const {
  useGetAllDisciplinaryActionsQuery,
  useGetDisciplinaryActionByIdQuery,
  useCreateDisciplinaryActionMutation,
  useUpdateDisciplinaryActionMutation,
  useDeleteDisciplinaryActionMutation,
  useGetDisciplinaryActionsListQuery, // <-- Export the new hook
} = disciplinaryActionsApi;

export default disciplinaryActionsApi;
