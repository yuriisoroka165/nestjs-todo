import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { DatabaseService } from "src/database/database.service";
import { CreateTodosDto, UpdateTodosDto } from "./dto/todos.dto";
import { TodoStatus } from "@prisma/client";

@Injectable()
export class TodosService {
    constructor(private databaseService: DatabaseService) {}

    async getTodosByUser(request: Request) {
        const { id: userId } = request.user as { id: string };

        return await this.databaseService.todo.findMany({ where: { userId }, select: { id: true, name: true, status: true } });
    }

    async createTodo(dto: CreateTodosDto, request: Request) {
        const { id: userId } = request.user as { id: string };

        const { name } = dto;

        try {
            const createdTodo = await this.databaseService.todo.create({
                data: {
                    name,
                    user: { connect: { id: userId } },
                },
            });

            return createdTodo;
        } catch (error) {
            throw new BadRequestException("Error while creating todo", error.message);
        }
    }

    async updateTodo(id: string, dto: UpdateTodosDto, request: Request) {
        const todo = await this.databaseService.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException("Todo with this id not found");

        const decodedUser = request.user as { id: string; login: string };
        if (decodedUser.id !== todo.userId) throw new ForbiddenException("You cannot update another user's todo.");

        const { name, status } = dto;

        const updateData: UpdateTodosDto = {};
        if (name) updateData.name = name;
        if (status !== undefined) {
            if (!Object.values(TodoStatus).includes(status)) {
                throw new BadRequestException("Invalid status value");
            } else {
                updateData.status = status;
            }
        }

        const updatedTodo = await this.databaseService.todo.update({
            where: { id },
            data: updateData,
            select: { id: true, name: true, status: true },
        });

        return updatedTodo;
    }

    async deleteTodo(id: string, request: Request) {
        const todo = await this.databaseService.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException("Todo with this id not found");

        const decodedUser = request.user as { id: string; login: string };
        if (decodedUser.id !== todo.userId) throw new ForbiddenException("You cannot delete another user's todo.");

        await this.databaseService.todo.delete({ where: { id } });

        return { message: "Todo deleted successfully" };
    }
}
