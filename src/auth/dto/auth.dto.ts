import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 15, { message: "Login must be between 3 and 15 characters" })
    public login: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    public password: string;
}

export class SignUpDto extends SignInDto {
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 25, { message: "Name must be between 3 and 25 characters" })
    public fullName: string;
}
