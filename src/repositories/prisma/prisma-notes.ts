import { prisma } from '../../prisma';
import { NoteCreateData, Notes } from '../notes';

export class PrismaNotes implements Notes {
    async create({ content, idPage, title, type }: NoteCreateData) {
        await prisma.note.create({
            data: {
                content,
                title,
                type,
                idPage
            }
        })
    };

    async get(idPage: string) {
        const notes = await prisma.note.findMany({
            where: {
                idPage
            }
        })

        return notes
    }

    async update(id: string, { content, idPage, title, type }: NoteCreateData) {
        await prisma.note.update({
            where: {
                id
            },
            data: {
                content,
                title,
                type,
                idPage
            }
        })
    }

    async delete(id: string) {
        await prisma.note.delete({
            where: {
                id
            }
        })
    }
}