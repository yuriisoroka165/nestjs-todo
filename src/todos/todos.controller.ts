import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";

import { TodosService } from "./todos.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { CreateTodosDto, UpdateTodosDto } from "./dto/todos.dto";

@ApiTags("Todos")
@ApiCookieAuth()
@Controller("todos")
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @ApiOperation({ summary: "Get todos by user." })
    @UseGuards(JwtAuthGuard)
    @Get()
    getTodosByUser(@Req() request) {
        return this.todosService.getTodosByUser(request);
    }

    @ApiOperation({ summary: "Create todo." })
    @UseGuards(JwtAuthGuard)
    @Post("create")
    createTodo(@Body() dto: CreateTodosDto, @Req() request) {
        return this.todosService.createTodo(dto, request);
    }

    @ApiOperation({ summary: "Update todo." })
    @UseGuards(JwtAuthGuard)
    @Patch("update/:id")
    updateTodo(@Param() params: { id: string }, @Req() request, @Body() dto: UpdateTodosDto) {
        return this.todosService.updateTodo(params.id, dto, request);
    }

    @ApiOperation({ summary: "Delete todo." })
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteTodo(@Param() params: { id: string }, @Req() request, @Res({ passthrough: true }) response) {
        return this.todosService.deleteTodo(params.id, request);
    }
}
