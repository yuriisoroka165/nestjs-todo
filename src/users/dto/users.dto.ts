import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @Length(3, 25, { message: "Name must be between 3 and 25 characters" })
    fullName?: string;

    @IsString()
    @IsOptional()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    password?: string;
}
