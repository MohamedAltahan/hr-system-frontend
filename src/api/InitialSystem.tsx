import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Vite
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const InitialSystemApi = createApi({
    reducerPath: 'InitialSystemApi',

    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),

    endpoints: (builder) => ({
    
        getInitailSystem: builder.query<any, {id:number}>({
            query: (id) => ({
                url:  `/api/system-inits?field_id=${id}`,
                method: 'GET',
            }),
        }),
         }),
});

export const {useGetInitailSystemQuery} = InitialSystemApi;
export default InitialSystemApi;
