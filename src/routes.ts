import express from 'express';

import { SubmitNoteService } from './services/note/submit-note-service';
import { PrismaNotes } from './repositories/prisma/prisma-notes';
import { SubmitUserService } from './services/user/submit-user-service';
import { SubmitPageService } from './services/page/submit-page-service';
import { PrismaUsers } from './repositories/prisma/prisma-users';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/feedback/submit-feedback-service';
import { PrismaPages } from './repositories/prisma/prisma-pages';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
});

routes.post('/user/create', async (req, res) => {
    const { email, name, description, imageUser } = req.body;

    const prismaUsers = new PrismaUsers();

    const submitUserService = new SubmitUserService(prismaUsers);

    try {
        await submitUserService.executeCreate({
            email,
            name,
            description,
            imageUser
        })

        return res.status(201).json({ message: 'Usuário criado!' });
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})

routes.post('/user/login', async (req, res) => {
    const email = req.body.email;

    const prismaUsers = new PrismaUsers();

    const submitUserService = new SubmitUserService(prismaUsers);

    try {
        const user = await submitUserService.executeLogin(email);

        return res.status(201).json(user);
    } catch (error) {
        console.log(error)

        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})

routes.post('/page/create', async (req, res) => {
    const { name, idUser, levelType, phase } = req.body;

    const prismaPages = new PrismaPages();

    const submitpageService = new SubmitPageService(prismaPages);

    try {
        await submitpageService.executeCreate({
            name,
            idUser,
            levelType,
            phase
        })

        return res.status(201).json({ message: 'Página criada!' });
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})

routes.post('/page/get', async (req, res) => {
    const idUser = req.body.idUser;

    const prismaPages = new PrismaPages();

    const submitpageService = new SubmitPageService(prismaPages);

    try {
        const pagesLoggedUser = await submitpageService.executeGet(idUser)

        return res.status(201).json(pagesLoggedUser)
    } catch (error) {
        console.log(error)

        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})

routes.patch('/page/update', async (req, res) => {
    const { id, name, idUser, levelType, phase } = req.body;

    const prismaPages = new PrismaPages();

    const submitpageService = new SubmitPageService(prismaPages);

    try {
        await submitpageService.executeUpdate(id, {
            name,
            idUser,
            levelType,
            phase
        })

        return res.status(201).json({ message: 'Página atualizada!' });
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }

})

routes.patch('/page/changePhase', async (req, res) => {
    const { id, name, idUser, levelType } = req.body;
    let { phase } = req.body

    const prismaPages = new PrismaPages();

    const submitpageService = new SubmitPageService(prismaPages);

    if (phase === 'processing') {
        phase = 'completed'
    } else if (phase === 'completed') {
        phase = 'processing'
    } else {
        phase = ''
    }

    try {
        await submitpageService.executaChangePhase(id, {
            name,
            idUser,
            levelType,
            phase
        })

        return res.status(201).json({ message: 'Página atualizada!' });
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }

})

routes.post('/page/delete', async (req, res) => {
    const id = req.body.id;

    const prismaPages = new PrismaPages();

    const submitpageService = new SubmitPageService(prismaPages);

    try {
        await submitpageService.executeDelete(id);

        return res.status(201).json({ message: 'Página deletada!' });
    } catch (error) {

        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})

routes.post('/note/create', async (req, res) => {
    const { content, idPage, title, type } = req.body;

    const prismaNotes = new PrismaNotes();

    const submitnoteService = new SubmitNoteService(prismaNotes);

    try {
        await submitnoteService.executeCreate({
            content,
            idPage,
            title,
            type
        })

        return res.status(201).json({ message: 'Nota criada!' });
    } catch (error) {

        console.log(error);
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})

routes.post('/note/get', async (req, res) => {
    const idPage = req.body.idPage;

    const prismaNotes = new PrismaNotes();

    const submitnoteService = new SubmitNoteService(prismaNotes);

    try {
        const notes = await submitnoteService.executeGet(idPage);

        return res.status(201).json(notes);

    } catch (error) {
        console.log(error);

        return res.status(401).json({ message: 'Algo de errado não está certo!' })
    }
})

routes.patch('/note/update', async (req, res) => {
    const { id, content, idPage, title, type } = req.body;

    const prismaNotes = new PrismaNotes();

    const submitnoteService = new SubmitNoteService(prismaNotes);

    try {

        await submitnoteService.executeUpdate(id, {
            content,
            idPage,
            title,
            type
        })

        return res.status(201).json({ message: 'Nota atualizada!' });

    } catch (error) {
        console.log(error);

        return res.status(401).json({ message: 'Algo de errado não está certo!' })
    }
})

routes.post('/note/delete', async (req, res) => {
    const id = req.body.id;

    const prismaNotes = new PrismaNotes();

    const submitnoteService = new SubmitNoteService(prismaNotes);

    try {
        await submitnoteService.executeDelete(id);

        return res.status(201).json({ message: 'Nota deletada!' });
    } catch (error) {
        console.log(error);

        return res.status(401).json({ message: 'Algo de errado não está certo!' })
    }
})