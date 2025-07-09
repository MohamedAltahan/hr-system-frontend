import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // Adjust path if needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const flightTicketsApi = createApi({
  reducerPath: 'FlightTicketsApi',
  tagTypes: ['flight-tickets'],

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),

  endpoints: (builder) => ({
    getAllFlightTickets: builder.query<
      any,
      { employee_id?: number; page?: number; status?: string }
    >({
      query: ({ employee_id, page, status }) => {
        const params = new URLSearchParams();
        if (employee_id) params.append('employee_id', employee_id.toString());
        if (status) params.append('status', status);
        if (page) params.append('page', page.toString());
        return {
          url: `/flight-tickets?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['flight-tickets'],
    }),

    getFlightTicketById: builder.query<any, number>({
      query: (id) => ({
        url: `/flight-tickets/${id}`,
        method: 'GET',
      }),
      providesTags: ['flight-tickets'],
    }),

    createFlightTicket: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/flight-tickets',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['flight-tickets'],
    }),

    updateFlightTicket: builder.mutation<
      any,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/flight-tickets/${id}?_method=PUT`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['flight-tickets'],
    }),

    deleteFlightTicket: builder.mutation<any, number>({
      query: (id) => ({
        url: `/flight-tickets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['flight-tickets'],
    }),
  }),
});

export const {
  useGetAllFlightTicketsQuery,
  useGetFlightTicketByIdQuery,
  useCreateFlightTicketMutation,
  useUpdateFlightTicketMutation,
  useDeleteFlightTicketMutation,
} = flightTicketsApi;

export default flightTicketsApi;
