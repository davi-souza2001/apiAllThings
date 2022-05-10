import express from 'express';

import { SubmitUserService } from './services/user/submit-user-service';
import { PrismaUsers } from './repositories/prisma/prisma-users';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/feedback/submit-feedback-service';
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

// routes.post('/user/login', async (req, res) => {
//     const email = req.body.email;
//     console.log(email)
//     console.log('\n')
//     const prismaUsers = new PrismaUsers();

//     const submitUserService = new SubmitUserService(prismaUsers);

//     try {
//         const user = await submitUserService.login(email)

//         return res.status(201).json({ message: user });
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ message: 'Algo de errado não está certo!' });
//     }

// })

routes.post('/user/login', async (req, res) => {
    const email = req.body.email;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return res.status(200).json({ message: user })
    } catch (error) {

        console.log(error)
        return res.status(401).json({ message: 'Algo de errado não está certo!' });
    }
})