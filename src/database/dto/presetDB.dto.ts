import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class PresetDBDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 15, { message: "Login must be between 3 and 15 characters. Please check .env file." })
    public ADMIN_LOGIN: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters. Please check .env file." })
    public ADMIN_PASSWORD: string;

    @IsEmail()
    public ADMIN_EMAIL: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 25, { message: "Name must be between 3 and 25 characters. Please check .env file." })
    public ADMIN_FULL_NAME: string;
}
