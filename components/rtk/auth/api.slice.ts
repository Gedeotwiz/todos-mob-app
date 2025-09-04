import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoStatus } from '../types/enum';
import { AddTodo, CreateUserInput, FetchTodos, GetTodosApiResponse, IAPIResponse, loginInput, loginOutput } from '../types/integration.type';


export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://d2ce779ccb60.ngrok-free.app/api/v1',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['GET_TODO'],
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
        }),
        invalidatesTags: [{ type: 'GET_TODO', id: 'LIST' }],
    }),

   getTodos: builder.query<GetTodosApiResponse, FetchTodos | void>({
  query: (args) => {
    const params = {
      page: args?.page ?? 1,
      size: args?.size ?? 5,
      q: args?.q ?? "",
    };
    return { url: "todos", method: "GET", params };
  },
  providesTags: [{ type: "GET_TODO", id: "LIST" }],
}),

getTodosByStatus: builder.query<GetTodosApiResponse, { status: TodoStatus }>({
  query: ({ status }) => ({
    url: `todos/status/${status}`,
    method: "GET",
  }),
  providesTags: [{ type: "GET_TODO", id: "LIST" }],
}),

  }),
});

export const {useSignUpMutation, useLoginMutation ,useUserLogedInQuery,useAddTodosMutation,useGetTodosQuery,useGetTodosByStatusQuery} = authApi;
