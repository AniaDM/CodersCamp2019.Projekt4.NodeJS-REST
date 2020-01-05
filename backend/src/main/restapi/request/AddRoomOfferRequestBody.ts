import {IsOptional, IsString, Length, IsDate, IsNumber, IsArray, Min, Max} from "class-validator";

export default class AddRoomOfferRequestBody {
    @IsString()
    @Length(2, 64)
    public username: string;

    @IsString()
    @Length(2, 64)
    public roomLocation: string;
    
    @IsString()
    @IsOptional()
    public dateCheckIn: string

    @IsString()
    @IsOptional()
    public dateCheckOut: string

    @IsNumber()
    public price: number

    @IsString()
    public roomPhoto: string

    @IsString()
    @IsOptional()
    public paymentMethod: string

    @IsNumber()
    public numberOfGuests: number

    @IsNumber()
    public numberOfBeds: number

    @IsNumber()
    @IsOptional()
    public numberOfGuestsPerBeds: number

    @IsArray()
    @IsOptional()
    additionalServices?: Array<string>

    @IsString()
    public title: string

    @IsString()
    public description: string

    constructor(username: string, roomLocation: string, dateCheckIn: string, dateCheckOut: string, price: number, roomPhoto: string, paymentMethod: string, numberOfGuests: number, numberOfBeds: number, numberOfGuestsPerBeds: number, additionalServices: Array<string>,title: string, description: string) {
        this.username = username;
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