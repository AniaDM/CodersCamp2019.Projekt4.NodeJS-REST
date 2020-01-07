import {UserProfileService} from "../userprofile/application/UserProfileService";
import {UserCredentialsService} from "../authentication/application/UserCredentialsService";
import * as bcrypt from "bcrypt";
import {RoomOffersService} from "../roomoffers/RoomOffersService";
import {RoomReservationService} from "../roomreservation/application/RoomReservationService";

export class DevMode {

    constructor(
        private userProfileService: UserProfileService,
        private userCredentialsService: UserCredentialsService,
        private roomOffersService: RoomOffersService,
        private roomReservationService: RoomReservationService) {
    }

    async populateDatabase() {
        const userDatas = [
            {
                id: DevMode.CurrentUser.id,
                username: DevMode.CurrentUser.username,
                email: "email1@email.com",
                firstName: "Jan",
                lastName: "Kowalski",
                password: "test1234"
            },
            {
                id: "anotherUserId",
                username: "AnotherUser",
                email: "email2@email.com",
                firstName: "Another",
                lastName: "Kowalski",
                password: "test1234"
            }
        ];

        userDatas.forEach(it => {
            const hashedPassword = bcrypt.hashSync(it.password, 10);

            this.userProfileService.registerUserProfile(
                {
                    _id: it.id,
                    username: it.username,
                    email: it.email,
                    firstName: it.firstName,
                    lastName: it.lastName
                }
            );

            this.userCredentialsService.createCredentials(
                {
                    _id: it.id,
                    username: it.username,
                    password: it.password
                }
            );
        });

        await this.roomOffersService.addOffer({
            _id: "RoomOfferId1",
            username: "AnotherUser",
            isPublic: false,
            roomLocation: "Wrocław",
            price: 123,
            numberOfGuests: 4,
            numberOfBeds: 2,
            numberOfGuestsPerBeds: 2,
            title: "Room in Wrocław",
            description: "Super room!"
        });

    }


}

export namespace DevMode {


    export namespace CurrentUser {
        export const id = "CurrentUserId";
        export const username = "CurrentUser";
    }
}