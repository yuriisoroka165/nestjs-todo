import { TodoStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateTodosDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}

export class UpdateTodosDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}
