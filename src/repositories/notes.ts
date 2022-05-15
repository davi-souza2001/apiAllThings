export interface NoteCreateData {
    title: string,
    content: string,
    type: string,
    idPage: string
}

export interface Notes {
    create: (data: NoteCreateData) => Promise<void>
    get: (idPage: string) => Promise<any>
    delete: (id: string) => Promise<void>
}