import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ description: "User email.", example: "bob123@example.com!", required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: "User full name.", example: "Bob Joli", required: false })
    @IsString()
    @IsOptional()
    @Length(3, 25, { message: "Name must be between 3 and 25 characters" })
    fullName?: string;

    @ApiPropertyOptional({ description: "User password.", example: "knkng345g!", required: false })
    @IsString()
    @IsOptional()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    password?: string;
}
