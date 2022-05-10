import { SubmitPageService } from '../page/submit-page-service';

const createFeedbackSpy = jest.fn();
const createLoginSpy = jest.fn();

const submitPage = new SubmitPageService(
    {
        create: createFeedbackSpy,
    }
)

describe('Submit user', () => {

    it('Should be able to submit a new page', async () => {

        await expect(submitPage.executeCreate({
            name: '123',
            idUser: 1,
            levelType: 'Low'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit a page without name', async () => {

        await expect(submitPage.executeCreate({
            name: '',
            idUser: 1,
            levelType: 'Low'
        })).rejects.toThrow();
    })

    it('Should not be able to submit a page without idUser', async () => {

        await expect(submitPage.executeCreate({
            name: 'asdasd',
            idUser: 0,
            levelType: 'Low'
        })).rejects.toThrow();
    })

    it('Should not be able to submit a page without levelType', async () => {

        await expect(submitPage.executeCreate({
            name: 'asdasd',
            idUser: 1,
            levelType: ''
        })).rejects.toThrow();
    })
})