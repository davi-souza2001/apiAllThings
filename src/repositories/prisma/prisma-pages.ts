import { prisma } from '../../prisma';
import { PageCreateData, Pages } from '../pages';

export class PrismaPages implements Pages {
    async create({ idUser, levelType, name, phase }: PageCreateData) {
        await prisma.page.create({
            data: {
                name,
                levelType,
                idUser,
                phase
            }
        })
    }

    async get(idUser: string) {
        const pages = await prisma.page.findMany({
            where: {
                idUser
            }
        })

        return pages
    }

    async update(id: string, { levelType, name, idUser }: PageCreateData) {
        await prisma.page.update({
            where: {
                id
            },
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

    async changePhase(id: string, phase: string) {
        await prisma.page.update({
            where: {
                id
            },
            data: {
                phase
            }
        })
    }
}