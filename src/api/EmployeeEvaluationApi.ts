import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeEvaluationApi = createApi({
  reducerPath: 'EmployeeEvaluationApi',
  tagTypes: ['EmployeeEvaluation'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    // Get all evaluations with pagination
    getAllEvaluations: builder.query<any, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: per_page.toString(),
        });
        return {
          url: `/employee-evaluation?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['EmployeeEvaluation'],
    }),

    // Get a specific evaluation by ID
    getEvaluationById: builder.query<any, number>({
      query: (id) => ({
        url: `/employee-evaluation/${id}`,
        method: 'GET',
      }),
      providesTags: ['EmployeeEvaluation'],
    }),

    // Create a new evaluation
    createEvaluation: builder.mutation<any, {
      employee_id: number;
      evaluation_from: string;
      evaluation_to: string;
      score: number;
      evaluator_id: number;
    }>({
      query: (body) => ({
        url: '/employee-evaluation',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['EmployeeEvaluation'],
    }),

    // Update an existing evaluation
    updateEvaluation: builder.mutation<any, {
      id: number;
      body: {
        employee_id?: number;
        evaluation_from?: string;
        evaluation_to?: string;
        score?: number;
        evaluator_id?: number;
      };
    }>({
      query: ({ id, body }) => ({
        url: `/employee-evaluation/${id}?_method=put`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['EmployeeEvaluation'],
    }),

    // Delete an evaluation
    deleteEvaluation: builder.mutation<any, number>({
      query: (id) => ({
        url: `/employee-evaluation/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EmployeeEvaluation'],
    }),
  }),
});

export const {
  useGetAllEvaluationsQuery,
  useGetEvaluationByIdQuery,
  useCreateEvaluationMutation,
  useUpdateEvaluationMutation,
  useDeleteEvaluationMutation,
} = EmployeeEvaluationApi;

export default EmployeeEvaluationApi;
