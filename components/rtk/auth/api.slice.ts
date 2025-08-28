import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUserInput, IAPIResponse, loginInput, loginOutput } from '../types/integration.type';




export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://4fb9e3212c2b.ngrok-free.app/api/v1'}),
  endpoints: (build) => ({
    getUser: build.query({
      query: (name:string) => `pokemon/${name}`,
    }),

    signUp:build.mutation<IAPIResponse<null>,CreateUserInput>({
         query:DTO =>({
            url:"auth/signup",
            method:"POST",
            body:DTO
         })
    }),

    login:build.mutation<IAPIResponse<loginOutput>,loginInput>({
       query:DTO =>({
            url:"auth/login",
            method:"POST",
            body:DTO
         })
    })
  }),
})

export const { useGetUserQuery,useSignUpMutation,useLoginMutation} = authApi