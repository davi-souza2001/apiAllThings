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

    async get(idUser: string) {
        const pages = await prisma.page.findMany({
            where:{
                idUser
            }
        })

        return pages
    }

    async delete(id: string) {
        await prisma.page.delete({
            where: {
                id
            }
        })
    }
}