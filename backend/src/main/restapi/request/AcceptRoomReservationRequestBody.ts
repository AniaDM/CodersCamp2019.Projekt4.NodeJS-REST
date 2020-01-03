import {IsOptional, IsString, Length, IsDate, IsNumber} from "class-validator";

export default class AcceptRoomReservationRequestBody {

    @IsString()
    @Length(5, 20)
    public status: string;

    constructor( status: string) {
        this.status = status;
    }
}