import { SubmitNoteService } from '../note/submit-note-service';

const createSubmitNoteSpy = jest.fn();
const getSubmitNoteSpy = jest.fn();
const deleteSubmitNoteSpy = jest.fn();

const submitNote = new SubmitNoteService(
    {
        create: createSubmitNoteSpy,
        get: getSubmitNoteSpy,
        delete: deleteSubmitNoteSpy
    }
)

describe('Submit user', () => {

    it('Should be able to submit a new note', async () => {

        await expect(submitNote.executeCreate({
            content: 'adasd',
            title: 'asdasd',
            type: 'asdas',
            idPage: 'asdsa'
        })).resolves.not.toThrow();

        expect(createSubmitNoteSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit a note without content', async () => {

        await expect(submitNote.executeCreate({
            content: '',
            title: 'asdas',
            type: 'asdas',
            idPage: 'asdsa'
        })).rejects.toThrow()
    })

    it('Should not be able to submit a note without title', async () => {

        await expect(submitNote.executeCreate({
            content: 'asdsa',
            title: '',
            type: 'asdas',
            idPage: 'asdsa'
        })).rejects.toThrow()
    })

    it('Should not be able to submit a note without type', async () => {

        await expect(submitNote.executeCreate({
            content: 'asdsa',
            title: 'asdas',
            type: '',
            idPage: 'asdsa'
        })).rejects.toThrow()
    })

    it('Should not be able to submit a note without idPage', async () => {

        await expect(submitNote.executeCreate({
            content: 'asdsa',
            title: 'asdas',
            type: 'asdas',
            idPage: ''
        })).rejects.toThrow()
    })

    it('Should be able to get the note', async () => {

        await expect(submitNote.executeGet('asd')).resolves.not.toThrow();

        expect(getSubmitNoteSpy).toHaveBeenCalled();
    })

    it('Should be able to get a note', async () => {

        await expect(submitNote.executeGet('asdsa')).resolves.not.toThrow();
    })

    it('Should not be able to get a note without idPage', async () => {

        await expect(submitNote.executeGet('')).rejects.toThrow()
    })

    it('Should be able to delete the note', async () => {

        await expect(submitNote.executeDelete('asdsa')).resolves.not.toThrow();

        expect(deleteSubmitNoteSpy).toHaveBeenCalled();
    })

    it('Should not be able to delete a note without id', async () => {

        await expect(submitNote.executeDelete('')).rejects.toThrow()
    })
})