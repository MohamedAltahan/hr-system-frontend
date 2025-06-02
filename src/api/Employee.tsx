import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getDynamicBaseUrl = (): string => {
  const baseDomain = import.meta.env.VITE_API_BASE_DOMAIN; // e.g., "alkholoudhr.com/api/v1"
  const hostname = window.location.hostname;

  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts[0] : 'admin';

  return `https://${subdomain}.${baseDomain}`;
};
const EmployeeApi = createApi({
  reducerPath: 'EmployeeApi',
  tagTypes: ['Employee'],
  baseQuery: fetchBaseQuery({
    baseUrl:getDynamicBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Lang', localStorage.getItem('lang') || 'ar');
      headers.set('Authorization', `Bearer ${localStorage.getItem('HrSystem') || ''}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get all employees with filters and pagination
    getAllEmployee: builder.query<
      any,
      {
        page?: number;
        per_page?: number;
        name?: string;
        branch_id?: number;
        employee_number?: string;
        department_id?: number;
        position_id?: number;
      }
    >({
      query: ({
        page = 1,
        per_page = 10,
        name,
        employee_number,
        branch_id,
        department_id,
        position_id,
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: per_page.toString(),
          ...(name ? { name } : {}),
          ...(employee_number ? { employee_number } : {}),
          ...(branch_id ? { branch_id: branch_id.toString() } : {}),
          ...(department_id ? { department_id: department_id.toString() } : {}),
          ...(position_id ? { position_id: position_id.toString() } : {}),
        });

        return {
          url: `/users?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Employee'],
    }),

    // Get employee by ID
    getEmployeeById: builder.query<any, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Employee'],
    }),

    // Create new employee
    createEmployee: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/users`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Employee'],
    }),

    // Update employee
    updateEmployee: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: 'POST', // Laravel might expect PUT via formData _method
        body: formData,
      }),
      invalidatesTags: ['Employee'],
    }),

    // Delete employee
    deleteEmployee: builder.mutation<any, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = EmployeeApi;

export default EmployeeApi;
