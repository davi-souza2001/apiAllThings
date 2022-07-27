import { Pages } from '../../repositories/pages';
interface SubmitPageServiceRequest {
    name: string,
    levelType: string,
    idUser: string,
    phase: string
}

export class SubmitPageService {
    constructor(
        private pagesRepository: Pages,
    ) { }

    async executeCreate(request: SubmitPageServiceRequest) {
        const { name, idUser, levelType, phase } = request;

        if (!name) {
            throw new Error('Diga um nome para sua página!')
        }
        if (!idUser) {
            throw new Error('Faça login para criar uma nota!')
        }
        if (!levelType) {
            throw new Error('Seleciona a prioridade da tua página!')
        }

        await this.pagesRepository.create({
            name,
            idUser,
            levelType,
            phase
        })
    }

    async executeGet(idUser: string) {
        if (!idUser) {
            throw new Error('Não foi possível buscar as páginas!')
        }

        const pages = await this.pagesRepository.get(idUser)

        return pages
    }

    async executeUpdate(id: string, request: SubmitPageServiceRequest) {
        const { name, levelType, idUser, phase } = request;

        if (!id) {
            throw new Error('Diga o id da sua página!')
        }
        if (!name) {
            throw new Error('Diga um nome para sua página!')
        }
        if (!idUser) {
            throw new Error('Faça login para criar uma nota!')
        }
        if (!levelType) {
            throw new Error('Seleciona a prioridade da sua página!')
        }
        if (!phase) {
            throw new Error('Selecione o estado da sua página!')
        }

        await this.pagesRepository.update(id, {
            name,
            levelType,
            idUser,
            phase
        })
    }

    async executeDelete(id: string) {

        if (!id) {
            throw new Error('Não foi possível deletar a página!')
        }

        await this.pagesRepository.delete(id)
    }
}
