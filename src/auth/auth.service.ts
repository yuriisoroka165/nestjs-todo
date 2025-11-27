import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";

import { SignInDto, SignUpDto } from "./dto/auth.dto";
import { DatabaseService } from "src/database/database.service";
import { JWT_SECRET } from "src/utils/constants";
import { UsersService } from "src/users/users.service";
import { comparePasswords } from "src/utils/password";

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private userService: UsersService,
        private jwt: JwtService
    ) {}

    async signup(dto: SignUpDto) {
        // перевикористано createUser
        await this.userService.createUser(dto);

        return { message: "Signup was succesfull" };
    }

    async signin(dto: SignInDto, request: Request, response: Response) {
        const { login, password } = dto;

        const foundUser = await this.databaseService.user.findUnique({ where: { login } });
        if (!foundUser) throw new BadRequestException("User with this login not found!");

        const isCorrectPassword = await comparePasswords(password, foundUser.password);
        if (!isCorrectPassword) throw new BadRequestException("Wrong password!");

        const token = await this.signToken({ id: foundUser.id, login: foundUser.login, permissions: foundUser.permissions });
        if (!token) throw new ForbiddenException();

        response.cookie("token", token);

        return response.send({ message: "Login is successful!" });
    }

    async signout(request: Request, response: Response) {
        response.clearCookie("token");
        return response.send({ mesage: "Logged out successful!" });
    }

    async signToken(args: { id: string; login: string; permissions: string }) {
        const payload = args;

        return this.jwt.signAsync(payload, { secret: JWT_SECRET });
    }
}
