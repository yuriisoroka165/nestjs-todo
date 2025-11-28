import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ description: "User email.", example: "bob123@example.com!" })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: "User full name.", example: "Bob Joli" })
    @IsString()
    @IsOptional()
    @Length(3, 25, { message: "Name must be between 3 and 25 characters" })
    fullName?: string;

    @ApiProperty({ description: "User password.", example: "knkng345g!" })
    @IsString()
    @IsOptional()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    password?: string;
}
