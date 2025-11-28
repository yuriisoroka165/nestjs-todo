import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TodoStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateTodosDto {
    @ApiProperty({ description: "Todo name.", example: "Start learning NestJS" })
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: "Todo satus.", example: "one of PENDING, IN_PROGRESS, COMPLETED", required: false })
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}

export class UpdateTodosDto {
    @ApiPropertyOptional({ description: "Todo name.", example: "Start learning NestJS tomorrow", required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: "Todo satus.", example: "one of PENDING, IN_PROGRESS, COMPLETED", required: false })
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}
