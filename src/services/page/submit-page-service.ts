import { Pages } from '../../repositories/pages';
interface SubmitPageServiceRequest {
    name: string,
    levelType: string,
    idUser: string
}

export class SubmitPageService {
    constructor(
        private pagesRepository: Pages,
    ) { }

    async executeCreate(request: SubmitPageServiceRequest) {
        const { name, idUser, levelType } = request;

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
            levelType
        })
    }

    async executeGet(idUser: string) {
        if (!idUser) {
            throw new Error('Não foi possível buscar as páginas!')
        }

        const pages = await this.pagesRepository.get(idUser)

        return pages
    }

    async executeDelete(id: string) {

        if (!id) {
            throw new Error('Não foi possível deletar a página!')
        }

        await this.pagesRepository.delete(id)
    }
}
