export interface PageCreateData{
    name: string,
    levelType: string,
    idUser: string
}

export interface Pages{
    create: (data: PageCreateData) => Promise<void>
    delete: (id: string) => Promise<void>
}