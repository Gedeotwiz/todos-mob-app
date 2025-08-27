import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateUserInput ,IAPIResponse} from '../types/integration.type'
import { Platform } from 'react-native';



const BASE_URL =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? 'http://192.168.1.172:3000/api/v1'
    : 'http://localhost:3000/api/v1';



export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
    })
  }),
})

export const { useGetUserQuery,useSignUpMutation} = authApi