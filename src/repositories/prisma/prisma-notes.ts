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
}