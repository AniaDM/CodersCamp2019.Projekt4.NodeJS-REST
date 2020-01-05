import {IsOptional, IsString, Length, IsDate, IsNumber, IsArray, Min, Max} from "class-validator";

export default class AddRoomOfferRequestBody {
    @IsString()
    @Length(2, 64)
    public roomLocation: string;

    @IsNumber()
    public price: number;

    @IsOptional()
    @IsString()
    public roomPhoto?: string;

    @IsString()
    @IsOptional()
    public paymentMethod: string;

    @IsNumber()
    public numberOfGuests: number;

    @IsNumber()
    public numberOfBeds: number;

    @IsNumber()
    @IsOptional()
    public numberOfGuestsPerBeds: number;

    @IsArray()
    @IsOptional()
    additionalServices?: Array<string>;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    constructor(roomLocation: string, price: number, paymentMethod: string, numberOfGuests: number, numberOfBeds: number, numberOfGuestsPerBeds: number, additionalServices: Array<string>, title: string, description: string, roomPhoto?: string,) {
        this.roomLocation = roomLocation;
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