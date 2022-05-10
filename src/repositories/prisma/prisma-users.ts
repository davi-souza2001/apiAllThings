import { prisma } from '../../prisma';
import { UserCreateData, Users } from '../users';

export class PrismaUsers implements Users {
    async create({ email, name, imageUser, description }: UserCreateData) {
        await prisma.user.create({
            data: {
                email,
                name,
                imageUser,
                description
            }
        })
    }

    async login(email: string) {
        await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }
}