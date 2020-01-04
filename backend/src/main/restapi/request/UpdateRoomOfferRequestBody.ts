import {IsOptional, IsString, Length, IsDate, IsNumber, IsArray} from "class-validator";

export default class UpdateRoomOfferRequestBody {

    @IsString()
    @Length(2, 64)
    @IsOptional()
    public roomLocation: string;

    @IsString()
    @IsOptional()
    public dateCheckIn: string

    @IsString()
    @IsOptional()
    public dateCheckOut: string

    @IsNumber()
    @IsOptional()
    public price: number

    @IsString()
    @IsOptional()
    public roomPhoto: string

    @IsString()
    @IsOptional()
    public paymentMethod: string

    @IsNumber()
    @IsOptional()
    public numberOfGuests: number

    @IsNumber()
    @IsOptional()
    public numberOfBeds: number

    @IsNumber()
    @IsOptional()
    public numberOfGuestsPerBeds: number

    @IsArray()
    @IsOptional()
    additionalServices?: Array<string>

    @IsString()
    @IsOptional()
    public title: string

    @IsString()
    @IsOptional()
    public description: string

    constructor(roomLocation: string, dateCheckIn: string, dateCheckOut: string, price: number, roomPhoto: string, paymentMethod: string, numberOfGuests: number, numberOfBeds: number, numberOfGuestsPerBeds: number, additionalServices: Array<string>, title: string, description: string) {
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
        this.title = title;
        this.description = description;
    }
}