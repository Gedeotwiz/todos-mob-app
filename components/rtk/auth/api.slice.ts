import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddTodo, CreateUserInput, IAPIResponse, loginInput, loginOutput } from '../types/integration.type';


export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://775a696cc637.ngrok-free.app/api/v1',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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

    userLogedIn:builder.query<any,void>({
       query:()=>`users/id`
    }),

    addTodos:builder.mutation<IAPIResponse<null>,AddTodo>({
        query:(DTO) =>({
          url:'todos',
          method:"POST",
          body:DTO
        })
    })
  }),
});

export const {useSignUpMutation, useLoginMutation ,useUserLogedInQuery,useAddTodosMutation} = authApi;
