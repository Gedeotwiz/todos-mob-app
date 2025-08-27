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
