import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const AttendceApi = createApi({
    reducerPath: 'AttendceApi',

    tagTypes: ['Attendce',"request","disciplinary"],
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),

    endpoints: (builder) => ({
    
        getAllOfficalTime: builder.query<any, {id:number}>({
            query: (id) => ({
                url:  `/api/attendance-rules`,
                method: 'GET',
            }),

        providesTags: ['Attendce'],
        }),
        getAttendanceAnalysis: builder.query<any, any>({
            query: () => ({
                url:  `/api/attendance-analysis`,
                method: 'GET',
            }),

        providesTags: ['Attendce'],
        }),
        getAttendanceRequest: builder.query<any, any>({
            query: () => ({
                url:  `/api/attendance-requests`,
                method: 'GET',
            }),

        providesTags: ['Attendce'],
        }),
            
    deleteAttendanceRules: builder.mutation({
        query: (id) => ({
            url: `/api/attendance-rules/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Attendce'],
    }),


    update_AttendanceRequest: builder.mutation<any, { id: string; formData:any }>({
        query: ({ id, formData }) => {
      
          return {
            url: `/api/attendance-requests/${id}`,
            method: 'PUT',
            body: formData,
          };
        },
        invalidatesTags: ['Attendce'],
      }),
    update_LeavesRequest: builder.mutation<any, { id: string; formData:any }>({
        query: ({ id, formData }) => {
      
          return {
            url: `/api/update-status/${id}`,
            method: 'PUT',
            body: formData,
          };
        },
        invalidatesTags: ['Attendce'],
      }),

      getAllLeavesData: builder.query<any, any>({
        query: () => ({
            url:  `/api/leaves`,
            method: 'GET',
        }),

    providesTags: ['Attendce'],
    }),
      getAllDisciplinaryData: builder.query<any, any>({
        query: () => ({
            url:  `/api/disciplinary-actions`,
            method: 'GET',
        }),

    providesTags: ['disciplinary'],
    }),
      getAllDisciplinarybyId: builder.query<any, any>({
        query: (id) => ({
            url:  `/api/disciplinary-actions/${id}`,
            method: 'GET',
        }),

    providesTags: ['disciplinary'],
    }),
    add_disciplinary: builder.mutation<any, any>({
        query: (formData) => ({
            url: `/api/disciplinary-actions`,
            method: 'POST',
            body: formData,
        }),
        invalidatesTags: ['disciplinary'],
    }),
    update_disciplinary: builder.mutation<any, any>({
        query: ({id,formData}) => ({
            url: `/api/disciplinary-actions/${id}`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: ['disciplinary'],
    }),
    update_AttendRules: builder.mutation<any, any>({
        query: ({id,formData}) => ({
            url: `/api/attendance-rules/${id}`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: ['Attendce'],
    }),
    update_Attend: builder.mutation<any, any>({
        query: ({id,formData}) => ({
            url: `/api/attendances/${id}`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: ['Attendce'],
    }),
    update_ToogelRules: builder.mutation<any, any>({
        query: (id) => ({
            url: `/api/attendance-rules/${id}/toggle-status`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Attendce'],
    }),
    add_AttendRulesRequest: builder.mutation<any, any>({
        query: (formData) => ({
            url: `/api/attendance-rules`,
            method: 'POST',
            body: formData,
        }),
        invalidatesTags: ['Attendce'],
    }),

    getAllAttendanceData: builder.query<any, any>({
        query: () => ({
            url:  `/api/attendances`,
            method: 'GET',
        }),

    providesTags: ['Attendce'],
    }),








      
     



        
 
 
    }),
});

export const {useGetAllOfficalTimeQuery,useGetAttendanceAnalysisQuery,useGetAttendanceRequestQuery,useGetAllLeavesDataQuery,useGetAllDisciplinaryDataQuery,useGetAllDisciplinarybyIdQuery,useGetAllAttendanceDataQuery, useAdd_AttendRulesRequestMutation,useAdd_disciplinaryMutation,useUpdate_disciplinaryMutation,useUpdate_AttendanceRequestMutation,useUpdate_LeavesRequestMutation,useUpdate_AttendRulesMutation,useUpdate_AttendMutation,useUpdate_ToogelRulesMutation, useDeleteAttendanceRulesMutation } = AttendceApi;
export default AttendceApi;
