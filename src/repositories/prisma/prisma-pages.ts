import { prisma } from '../../prisma';
import { PageCreateData, Pages } from '../pages';

export class PrismaPages implements Pages {
    async create({ idUser, levelType, name }: PageCreateData) {
        await prisma.page.create({
            data: {
                name,
                levelType,
                idUser
            }
        })
    }

    async delete(id: string) {
        await prisma.page.delete({
            where: {
                id
            }
        })
    }
}