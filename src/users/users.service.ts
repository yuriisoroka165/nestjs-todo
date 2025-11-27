import { Request, Response } from "express";
import { BadRequestException, ForbiddenException, forwardRef, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "src/database/database.service";
import { SignUpDto } from "src/auth/dto/auth.dto";
import { hashPassword } from "src/utils/password";
import { UpdateUserDto } from "./dto/users.dto";

@Injectable()
export class UsersService {
    constructor(private databaseService: DatabaseService) {}

    async getUser(id: string, request: Request) {
        const user = await this.databaseService.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException("User with this id not found");

        const decodedUser = request.user as { id: string; login: string };
        if (user.id !== decodedUser.id) throw new ForbiddenException("You cannot access another user's data.");

        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword };
    }

    async getAllUsers() {
        return await this.databaseService.user.findMany({ select: { id: true, login: true, email: true, fullName: true } });
    }

    async createUser(dto: SignUpDto) {
        const { login, email, password, fullName } = dto;

        const exitingUserEmail = await this.databaseService.user.findUnique({
            where: { email },
        });
        const exitingUserLogin = await this.databaseService.user.findUnique({
            where: { login },
        });

        if (exitingUserEmail) {
            throw new BadRequestException("User with this email already exists");
        } else if (exitingUserLogin) {
            throw new BadRequestException("User with this login already exists");
        }

        const hashedPassword = await hashPassword(password);

        try {
            await this.databaseService.user.create({
                data: {
                    login,
                    email,
                    fullName,
                    password: hashedPassword,
                },
            });

            return { message: "User created" };
        } catch (error) {
            throw new BadRequestException("Error while creating user", error.message);
        }
    }

    // для зміни дозволено email, fullName та password
    async updateUser(id: string, request: Request, dto: UpdateUserDto) {
        const user = await this.databaseService.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException("User with this id not found");

        const decodedUser = request.user as { id: string; login: string };
        if (user.id !== decodedUser.id) throw new ForbiddenException("You cannot update another user's data.");

        const { email, fullName, password } = dto;

        const updateData: UpdateUserDto = {};
        if (email) updateData.email = email;
        if (fullName) updateData.fullName = fullName;
        if (password) updateData.password = await hashPassword(password);

        await this.databaseService.user.update({
            where: {
                id,
            },
            data: updateData,
        });

        return { message: "User updated" };
    }

    async deleteUser(id: string, request: Request, response: Response) {
        const user = await this.databaseService.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException("User with this id not found");

        const decodedUser = request.user as { id: string; login: string; permissions: string };
        if (user.id !== decodedUser.id && decodedUser.permissions !== "ADMIN") {
            throw new ForbiddenException("You cannot delete another user's account.");
        }

        await this.databaseService.user.delete({ where: { id } });

        if (user.id === decodedUser.id) {
            response.clearCookie("token");
        }

        return { message: "User deleted successfully" };
    }

    // async hashPassword(password: string) {
    //     // скільки раундів "cолювання" застосувати до пароля
    //     const saltOrRounds = 10;
    //     return await bcrypt.hash(password, saltOrRounds);
    // }
}
