import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {
    @ApiProperty({ description: "User login.", example: "bob" })
    @IsNotEmpty()
    @IsString()
    @Length(3, 15, { message: "Login must be between 3 and 15 characters" })
    public login: string;

    @ApiProperty({ description: "User password.", example: "knkng345g!" })
    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    public password: string;
}

export class SignUpDto extends SignInDto {
    @ApiProperty({ description: "User email.", example: "bob123@example.com!" })
    @IsEmail()
    public email: string;

    @ApiProperty({ description: "User full name.", example: "Bob Joli" })
    @IsNotEmpty()
    @IsString()
    @Length(3, 25, { message: "Name must be between 3 and 25 characters" })
    public fullName: string;
}
