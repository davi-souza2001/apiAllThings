import { PrismaUsers } from '../../repositories/prisma/prisma-users';
import { Users } from '../../repositories/users';
interface SubmitUserServiceRequest {
    email: string,
    name: string,
    imageUser?: string,
    description?: string
}

export class SubmitUserService {
    constructor(
        private usersRepository: Users,
    ) { }

    async executeCreate(request: SubmitUserServiceRequest) {
        const { email, name, description, imageUser } = request

        if (!email) {
            throw new Error('Seu email é obrigatório!')
        }

        if (!name) {
            throw new Error('Seu nome é obrigatório!')
        }

        await this.usersRepository.create({
            email,
            name,
            description,
            imageUser
        })
    }

    async executeLogin(id: string) {
        if (!id){
            throw new Error('Seu id é obrigatório!')
        }

        const user = await this.usersRepository.login(id)

        return user
    }
}
