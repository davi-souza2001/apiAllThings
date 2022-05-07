import { SubmitUserServide } from '../user/submit-user-service';

const createFeedbackSpy = jest.fn();

const submitUser = new SubmitUserServide(
    { create: createFeedbackSpy }
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
})