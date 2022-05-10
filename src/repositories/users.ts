export interface UserCreateData{
    email: string,
    name: string,
    imageUser?: string,
    description?: string
}

export interface Users{
    create: (data: UserCreateData) => Promise<void>
    login: (email: string) => Promise<any>
}