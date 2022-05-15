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
        const idPage = request;

        if (!idPage) {
            throw new Error('Diga à quem sua nota pertence!')
        }

        const notes = await this.notesRepository.get(idPage);

        return notes
    }

    async executeUpdate(id: string, request: SubmitNoteServiceRequest) {
        const { content, idPage, title, type } = request;

        if (!id) {
            throw new Error('Diga o id da nota que deseja atualizar!')
        }
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

        await this.notesRepository.update(id, {
            content,
            idPage,
            title,
            type
        })

    }

    async executeDelete(request: string) {
        const id = request;

        if (!id) {
            throw new Error('Diga o id da nota que deseja deletar!')
        }

        await this.notesRepository.delete(id);
    }
}