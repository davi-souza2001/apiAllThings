import { UserCreateData, Users } from '../../repositories/users';
interface SubmitUserServiceRequest {
    email: string,
    name: string,
    imageUser?: string,
    description?: string
}

export class SubmitUserServide {
    constructor(
        private usersRepository: Users,
    ) { }

    async executeCreate(request: SubmitUserServiceRequest) {
        const { email, name, description, imageUser } = request

        if (!email){
            throw new Error('Seu email é obrigatório!')
        }

        if (!name){
            throw new Error('Seu nome é obrigatório!')
        }

        await this.usersRepository.create({
            email,
            name,
            description,
            imageUser
        })
    }
}