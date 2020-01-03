import {IsDefined, IsEmail, IsOptional, IsString, Length} from "class-validator";
import {RoomRating} from "../../roomreview/RoomRating";

export default class RegisterUserRequestBody {

    @IsString()
    public roomOfferId: string;

    @IsDefined()
    public rate: RoomRating;

    @IsOptional()
    public content?: string;


    constructor(roomOfferId: string, rate: 1 | 2 | 3 | 4 | 5, content: string) {
        this.roomOfferId = roomOfferId;
        this.rate = rate;
        this.content = content;
    }
}
