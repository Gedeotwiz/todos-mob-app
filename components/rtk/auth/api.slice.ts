import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUserInput, IAPIResponse, loginInput, loginOutput } from '../types/integration.type';


export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://3dce9fb3585e.ngrok-free.app/api/v1',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (name: string) => `pokemon/${name}`,
    }),

    signUp: builder.mutation<IAPIResponse<null>, CreateUserInput>({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<IAPIResponse<loginOutput>, loginInput>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useSignUpMutation, useLoginMutation } = authApi;
