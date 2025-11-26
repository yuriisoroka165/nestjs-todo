import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";

import { SignInDto, SignUpDto } from "./dto/auth.dto";
import { DatabaseService } from "src/database/database.service";
import { JWT_SECRET } from "src/utils/constants";
import { Request, Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        private databaseService: DatabaseService,
        private jwt: JwtService
    ) {}

    async signup(dto: SignUpDto) {
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

        const hashedPassword = await this.hashPassword(password);

        await this.databaseService.user.create({
            data: {
                login,
                email,
                fullName,
                password: hashedPassword,
            },
        });

        return { message: "Signup was succesfull" };
    }

    async signin(dto: SignInDto, request: Request, response: Response) {
        const { login, password } = dto;

        const foundUser = await this.databaseService.user.findUnique({ where: { login } });

        if (!foundUser) throw new BadRequestException("User with this login not found!");

        const isCorrectPassword = await this.copmarePasswords({ password, hash: foundUser.password });

        if (!isCorrectPassword) throw new BadRequestException("Wrong password!");

        const token = await this.signToken({ id: foundUser.id, login: foundUser.login });

        if (!token) throw new ForbiddenException();

        response.cookie("token", token);

        return response.send({ message: "Login is successful!" });
    }

    async signout(request: Request, response: Response) {
        response.clearCookie("token");
        return response.send({ mesage: "Logged out successful!" });
    }

    async hashPassword(password: string) {
        // скільки раундів "cолювання" застосувати до пароля
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async copmarePasswords(args: { password: string; hash: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: { id: string; login: string }) {
        const payload = args;

        return this.jwt.signAsync(payload, { secret: JWT_SECRET });
    }
}
