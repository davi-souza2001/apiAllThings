export interface PageCreateData{
    name: string,
    levelType: string,
    idUser: number
}

export interface Pages{
    create: (data: PageCreateData) => Promise<void>
    delete: (id: number) => Promise<void>
}