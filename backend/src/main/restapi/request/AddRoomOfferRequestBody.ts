import {IsOptional, IsString, Length, IsDate, IsNumber, IsArray, Min, Max} from "class-validator";

export default class AddRoomOfferRequestBody {

    @IsString()
    @Length(2, 64)
    public roomLocation: string;
    
    @IsString()
    public dateCheckIn: string

    @IsString()
    public dateCheckOut: string

    @IsNumber()
    public price: number

    @IsString()
    public roomPhoto: string

    @IsString()
    public paymentMethod: string

    @IsNumber()
    public numberOfGuests: number

    @IsNumber()
    public numberOfBeds: number

    @IsNumber()
    public numberOfGuestsPerBeds: number

    @IsArray()
    @IsOptional()
    additionalServices?: Array<string>

    constructor(roomLocation: string, dateCheckIn: string, dateCheckOut: string, price: number, roomPhoto: string, paymentMethod: string, numberOfGuests: number, numberOfBeds: number, numberOfGuestsPerBeds: number, additionalServices: Array<string>) {
        this.roomLocation = roomLocation;
        this.dateCheckIn = dateCheckIn;
        this.dateCheckOut = dateCheckOut;
        this.price = price;
        this.roomPhoto = roomPhoto;
        this.paymentMethod = paymentMethod;
        this.numberOfGuests = numberOfGuests;
        this.numberOfBeds = numberOfBeds;
        this.numberOfGuestsPerBeds = numberOfGuestsPerBeds;
        this.additionalServices = additionalServices;
    }
}