import { SubmitPageService } from '../page/submit-page-service';

const createSubmitPageSpy = jest.fn();
const deleteSubmitPageSpy = jest.fn();

const submitPage = new SubmitPageService(
    {
        create: createSubmitPageSpy,
        delete: deleteSubmitPageSpy
    }
)

describe('Submit user', () => {

    it('Should be able to submit a new page', async () => {

        await expect(submitPage.executeCreate({
            name: '123',
            idUser: 'asdasdasd2',
            levelType: 'Low'
        })).resolves.not.toThrow();

        expect(createSubmitPageSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit a page without name', async () => {

        await expect(submitPage.executeCreate({
            name: '',
            idUser: 'asdasds',
            levelType: 'Low'
        })).rejects.toThrow();
    })

    it('Should not be able to submit a page without idUser', async () => {

        await expect(submitPage.executeCreate({
            name: 'asdasd',
            idUser: '',
            levelType: 'Low'
        })).rejects.toThrow();
    })

    it('Should not be able to submit a page without levelType', async () => {

        await expect(submitPage.executeCreate({
            name: 'asdasd',
            idUser: 'asdas',
            levelType: ''
        })).rejects.toThrow();
    })

    it('Should be able to delete a page', async () => {

        await expect(submitPage.executeDelete('asdasd')).resolves.not.toThrow();
    })

    it('Should not be able to delete a page with invalid id', async () => {

        await expect(submitPage.executeDelete('')).rejects.toThrow();
    })
})