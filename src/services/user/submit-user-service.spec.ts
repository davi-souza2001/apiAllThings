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

    it('Should not be able to login a user without email', async () => {
        const email = ''

        await expect(submitUser.login(email)).rejects.toThrow();
    })

    it('Should be able to login a user with email', async () => {
        const email = 'asdasdas'

        expect(submitUser.login(email)).resolves;
    })
})