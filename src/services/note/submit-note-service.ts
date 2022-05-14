import { Notes } from '../../repositories/notes';
export interface SubmitNoteServiceRequest {
    title: string,
    content: string,
    type: string,
    idPage: string
}

export class SubmitNoteService {
    constructor(
        private notesRepository: Notes,
    ) { }

    async executeCreate(request: SubmitNoteServiceRequest) {
        const { content, idPage, title, type } = request;

        if (!content) {
            throw new Error('Diga um conteúdo para sua nota!')
        }
        if (!idPage) {
            throw new Error('Diga à quem sua nota pertence!')
        }
        if (!title) {
            throw new Error('Diga um título para sua nota!')
        }
        if (!type) {
            throw new Error('Diga o tipo da sua nota!')
        }

        await this.notesRepository.create({
            content,
            idPage,
            title,
            type
        })
    }

    async executeGet(request: string) {
        const idPage = request

        if (!idPage) {
            throw new Error('Diga à quem sua nota pertence!')
        }

        const notes = await this.notesRepository.get(idPage)

        return notes
    }
}