import { Request } from "express";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { TodoStatus } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { CreateTodosDto, UpdateTodosDto } from "./dto/todos.dto";

@Injectable()
export class TodosService {
    constructor(private databaseService: DatabaseService) {}

    private assertOwner(todoUserId: string, currentUserId: string) {
        if (todoUserId !== currentUserId) {
            throw new ForbiddenException("You cannot access another user's todo.");
        }
    }

    async getTodosByUser(request: Request) {
        const { id: userId } = request.user as { id: string };

        return await this.databaseService.todo.findMany({ where: { userId }, select: { id: true, name: true, status: true } });
    }

    async createTodo(dto: CreateTodosDto, request: Request) {
        const { id: userId } = request.user as { id: string };

        const { name } = dto;

        return await this.databaseService.todo.create({
            data: {
                name,
                user: { connect: { id: userId } },
            },
        });
    }

    async updateTodo(id: string, dto: UpdateTodosDto, request: Request) {
        const todo = await this.databaseService.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException("Todo with this id not found");

        const decodedUser = request.user as { id: string; login: string };
        this.assertOwner(todo.userId, decodedUser.id);

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
        this.assertOwner(todo.userId, decodedUser.id);

        await this.databaseService.todo.delete({ where: { id } });

        return { message: "Todo deleted successfully" };
    }
}
