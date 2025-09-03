import { TodoStatus } from "./enum"


export interface CreateUserInput{
    names:string,
    email:string,
    phone:string,
    password:string
}

export interface IAPIResponse<T> {
    message: string
    payload: T
    translatedMessage: string
}

export interface loginInput{
    email:string,
    password:string
}

export interface loginOutput{
    accessToken:string
}

export interface AddTodo{
    title:string,
    description: string,
    time: string

}

export interface FetchTodos{
    page?:number,
    size?:number,
    q?:string,
    id?:string
}

export interface TodoResponse {
  id: string;
  title: string;
  description: string;
  time?: string;
  status: TodoStatus; 
  userId?: string;
}

export interface GetTodosApiResponse {
  message: string;
  payload: {
    data: TodoResponse[];
    total?: number;
  };
}