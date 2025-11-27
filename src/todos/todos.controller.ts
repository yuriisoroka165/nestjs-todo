import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { CreateTodosDto, UpdateTodosDto } from "./dto/todos.dto";

@Controller("todos")
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @UseGuards(JwtAuthGuard)
    @Get("")
    getTodosByUser(@Req() request) {
        return this.todosService.getTodosByUser(request);
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createTodo(@Body() dto: CreateTodosDto, @Req() request) {
        return this.todosService.createTodo(dto, request);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update/:id")
    updateTodo(@Param() params: { id: string }, @Req() request, @Body() dto: UpdateTodosDto) {
        return this.todosService.updateTodo(params.id, dto, request);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    deleteTodo(@Param() params: { id: string }, @Req() request, @Res({ passthrough: true }) response) {
        return this.todosService.deleteTodo(params.id, request);
    }
}
