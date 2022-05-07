import { SubmitUserServide } from './services/user/submit-user-service';
import { PrismaUsers } from './repositories/prisma/prisma-users';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import express from 'express';

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

    const submitUserService = new SubmitUserServide(prismaUsers);

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