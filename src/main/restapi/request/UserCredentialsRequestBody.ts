import {IsEmail, IsOptional, IsString, Length} from "class-validator";

export default class RegisterUserRequestBody {

    @IsString()
    @Length(4, 64)
    public username: string;

    @IsString()
    @Length(4, 32)
    public password: string;

    constructor(username: string,  password: string) {
        this.username = username;
        this.password = password;
    }
}
