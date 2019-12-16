import {EmailSender} from "../../main/emailmessage/EmailSender";
import {CommandResult} from "../../main/sharedkernel/application/CommandResult";

describe("Feature: Sending email message to guest with request for opinion after stay", () => {

    const emailSenderMock: EmailSender = {
        execute: jest.fn(command => Promise.resolve(CommandResult.success()))
    };

    const roomOpinionRequester = new RoomOpinionRequester(emailSenderMock);

    describe('Given stay for opinion', () => {

        const stayId = "StayId";

        describe('When request for opinion', () => {

            const requestForOpinion = new RequestForOpinionCommand(stayId);

            it("Then email with information about survey with opinion should be sent", () => {
                roomOpinionRequester.execute(requestForOpinion);
                expect(emailSenderMock.execute).toBeCalledTimes(1);
            })
        })
    })


});

