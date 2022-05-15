import { SubmitFeedbackService } from '../services/feedback/submit-feedback-service';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
    it('Should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'Example commeent',
            screenshot: 'data:image/png;base64,asdasdasd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit a feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example commeent',
            screenshot: 'data:image/png;base64,asdasdasd'
        })).rejects.toThrow();
    })

    it('Should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'asdasd',
            comment: '',
            screenshot: 'data:image/png;base64,asdasdasd'
        })).rejects.toThrow();
    })

    it('Should not be able to submit a feedback with an invalid screenshot', async () => {

        await expect(submitFeedback.execute({
            type: 'asdasd',
            comment: 'asdasdsa',
            screenshot: 'datasda:image/png;base64,asdasdasd'
        })).rejects.toThrow();
    })
})