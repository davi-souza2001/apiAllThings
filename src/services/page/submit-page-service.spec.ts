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
            idUser: 1,
            levelType: 'Low'
        })).resolves.not.toThrow();

        expect(createSubmitPageSpy).toHaveBeenCalled();
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

    it('Should be able to delete a page', async () => {

        await expect(submitPage.executeDelete(1)).resolves.not.toThrow();
    })

    it('Should not be able to delete a page with invalid id', async () => {

        await expect(submitPage.executeDelete(0)).rejects.toThrow();
    })
})