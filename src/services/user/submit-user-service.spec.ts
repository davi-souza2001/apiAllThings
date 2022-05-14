import { PrismaUsers } from '../../repositories/prisma/prisma-users';
import { SubmitUserService } from '../user/submit-user-service';

const createFeedbackSpy = jest.fn();
const createLoginSpy = jest.fn();

const submitUser = new SubmitUserService(
    {
        create: createFeedbackSpy,
        login: createLoginSpy
    }
)
describe('Submit user', () => {
    it('Should be able to submit a user', async () => {

        await expect(submitUser.executeCreate({
            email: '123',
            name: '123',
            description: '',
            imageUser: ''
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit a user without name', async () => {

        await expect(submitUser.executeCreate({
            email: '123',
            name: '',
            description: '',
            imageUser: ''
        })).rejects.toThrow();
    })

    it('Should not be able to submit a user without email', async () => {

        await expect(submitUser.executeCreate({
            email: '',
            name: '123',
            description: '',
            imageUser: ''
        })).rejects.toThrow();
    })

    it('Should be able to submit a user', async () => {

        await expect(submitUser.executeLogin('sadas')).resolves.not.toThrow();

        expect(createLoginSpy).toHaveBeenCalled();
    })

    it('Should be able to made login with email', async () => {
        await expect(submitUser.executeLogin('davisouza2001')).resolves.not.toThrow();
    })

    it('Should be able to made login without email', async () => {
        await expect(submitUser.executeLogin('')).rejects.toThrow();
    })
})