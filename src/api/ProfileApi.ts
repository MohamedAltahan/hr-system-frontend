import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './common/prepareHeaders'; // adjust path as needed

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfileApi = createApi({
  reducerPath: 'ProfileApi',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    // Get current user's profile
    getProfile: builder.query<any, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    // Update profile
   updateProfile: builder.mutation<
  any,
  {
    // name: { ar: string; en: string };
    name_ar: string;
    name_en: string;
    email: string;
    phone: string;
    password?: string;
    password_confirmation?: string;
    avatar?: File | null;
  }
>({
  query: ({ name_ar,name_en, email, phone, password, password_confirmation, avatar }) => {
    const formData = new FormData();
    formData.append('name[ar]', name_ar);
    formData.append('name[en]', name_en);
    formData.append('email', email);
    formData.append('phone', phone);
    if (password) {
      formData.append('password', password);
      formData.append('password_confirmation', password_confirmation || '');
    }
    if (avatar) {
      formData.append('avatar', avatar);
    }

    return {
      url: '/update-profile?_method=put',
      method: 'POST',
      body: formData,
    };
  },
  invalidatesTags: ['Profile'],
}),

  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = ProfileApi;
export default ProfileApi;
