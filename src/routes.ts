import express from 'express';

import { SubmitUserService } from './services/user/submit-user-service';
import { SubmitPageService } from './services/page/submit-page-service';
import { PrismaUsers } from './repositories/prisma/prisma-users';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/feedback/submit-feedback-service';
import { PrismaPages } from './repositories/prisma/prisma-pages';
import { prisma } from './prisma';

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
    const { name, idUser, levelType } = req.body;

    const prismaPages = new PrismaPages()

    const submitpageService = new SubmitPageService(prismaPages)

    try {
        await submitpageService.executeCreate({
            name,
            idUser,
            levelType
        })

        return res.status(201).json({ message: 'Página criada!' });
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})