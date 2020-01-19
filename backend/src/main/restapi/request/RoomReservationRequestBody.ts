import {IsOptional, IsString, Length, IsDate, IsNumber} from "class-validator";

export default class RoomReservationRequestBody {

    @IsString()
    public offerId: string;

    @IsString()
    public name: string;

    @IsString()
    public surname: string;

    @IsString()
    public dateCheckIn: string;

    @IsString()
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


    constructor(offerId: string, name: string, surname: string, dateCheckIn: string, dateCheckOut: string, paymentMethod: string, status: string, numberOfGeusts: number, notice: string) {
        this.offerId = offerId;
        this.name = name;
        this.surname = surname;
        this.dateCheckIn = dateCheckIn;
        this.dateCheckOut = dateCheckOut;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.numberOfGeusts = numberOfGeusts;
        this.notice = notice;
    }
}