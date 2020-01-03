import {IsOptional, IsString, Length, IsDate, IsNumber} from "class-validator";

export default class UpdateRoomReservationRequestBody {

    @IsDate()
    public dateCheckIn: string;

    @IsDate()
    public dateCheckOut: string;

    @IsString()
    @Length(3, 64)
    public paymentMethod: string;

    @IsString()
    @Length(5, 20)
    public status: string;

    @IsNumber()
    @IsOptional()
    public numberOfGeusts: number;

    @IsString()
    @Length(4, 255)
    @IsOptional()
    public notice: string;

    constructor(dateCheckIn: string, dateVheckOut: string,  paymentMethod: string, status: string, numberOfGuests: number, notice: string) {
        this.dateCheckIn = dateCheckIn;
        this.dateCheckOut = dateVheckOut;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.numberOfGeusts = numberOfGuests;
        this.notice = notice;
    }
}