import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { SignUpDto } from "src/auth/dto/auth.dto";
import { UpdateUserDto } from "./dto/users.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getUser(@Param() params: { id: string }, @Req() request) {
        return this.usersService.getUser(params.id, request);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createUser(@Body() dto: SignUpDto) {
        return this.usersService.createUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update/:id")
    updateUser(@Param() params: { id: string }, @Req() request, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(params.id, request, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    //@Res({ passthrough: true }) - без passthrough зависає (коли видаляється юзер і виконується  response.clearCookie("token");)
    deleteUser(@Param() params: { id: string }, @Req() request, @Res({ passthrough: true }) response) {
        return this.usersService.deleteUser(params.id, request, response);
    }
}
