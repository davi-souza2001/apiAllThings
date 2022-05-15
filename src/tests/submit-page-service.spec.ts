import { SubmitPageService } from '../services/page/submit-page-service';

const createSubmitPageSpy = jest.fn();
const getSubmitPageSpy = jest.fn();
const deleteSubmitPageSpy = jest.fn();
const updateSubmitPageSpy = jest.fn();

const submitPage = new SubmitPageService(
    {
        create: createSubmitPageSpy,
        get: getSubmitPageSpy,
        update: updateSubmitPageSpy,
        delete: deleteSubmitPageSpy,
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

    it('Should be able to delete the page', async () => {

        await expect(submitPage.executeDelete('asd')).resolves.not.toThrow();

        expect(deleteSubmitPageSpy).toHaveBeenCalled();
    })

    it('Should be able to delete a page', async () => {

        await expect(submitPage.executeDelete('asdasd')).resolves.not.toThrow();
    })

    it('Should not be able to delete a page with invalid id', async () => {

        await expect(submitPage.executeDelete('')).rejects.toThrow();
    })

    it('Should be able to get the page', async () => {

        await expect(submitPage.executeGet('asd')).resolves.not.toThrow();

        expect(getSubmitPageSpy).toHaveBeenCalled();
    })

    it('Should be able to get the pages that belongs a user', async () => {

        await expect(submitPage.executeGet('asd')).resolves.not.toThrow();
    })

    it('Should not be able to get the pages that belongs a user', async () => {

        await expect(submitPage.executeGet('')).rejects.toThrow();
    })

    it('Should be able to update the page', async () => {

        await expect(submitPage.executeUpdate('asdasd', {
            name: '123',
            idUser: 'asdasdasd2',
            levelType: 'Low'
        })).resolves.not.toThrow();

        expect(updateSubmitPageSpy).toHaveBeenCalled();
    })

    it('Should not be able to update the page without name', async () => {

        await expect(submitPage.executeUpdate('asdasd', {
            name: '',
            idUser: 'asdasds',
            levelType: 'Low'
        })).rejects.toThrow();
    })

    it('Should not be able to update the page without idUser', async () => {

        await expect(submitPage.executeUpdate('asdasd', {
            name: 'asdasd',
            idUser: '',
            levelType: 'Low'
        })).rejects.toThrow();
    })

    it('Should not be able to update the page without levelType', async () => {

        await expect(submitPage.executeUpdate('asdasd', {
            name: 'asdasd',
            idUser: 'asdas',
            levelType: ''
        })).rejects.toThrow();
    })

    it('Should not be able to update the page with invalid id', async () => {

        await expect(submitPage.executeUpdate('', {
            name: 'asdasd',
            idUser: 'asdas',
            levelType: 'Low'
        })).rejects.toThrow();
    })
})