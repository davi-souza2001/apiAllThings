import { SubmitNoteService } from '../note/submit-note-service';

const createSubmitPageSpy = jest.fn();
const deleteSubmitPageSpy = jest.fn();

const submitNote = new SubmitNoteService(
    {
        create: createSubmitPageSpy,
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

        expect(createSubmitPageSpy).toHaveBeenCalled();
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
})