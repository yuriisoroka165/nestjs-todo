import { ApiProperty } from "@nestjs/swagger";
import { TodoStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateTodosDto {
    @ApiProperty({ description: "Todo name.", example: "Start learning NestJS" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Todo satus.", example: "one of PENDING, IN_PROGRESS, COMPLETED" })
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}

export class UpdateTodosDto {
    @ApiProperty({ description: "Todo name.", example: "Start learning NestJS tomorrow" })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: "Todo satus.", example: "one of PENDING, IN_PROGRESS, COMPLETED" })
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}
