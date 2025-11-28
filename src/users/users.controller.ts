import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";

import { UpdateUserDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { SignUpDto } from "src/auth/dto/auth.dto";

@ApiTags("Users")
@ApiCookieAuth()
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: "Get user by id." })
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getUser(@Param() params: { id: string }, @Req() request) {
        return this.usersService.getUser(params.id, request);
    }

    @ApiOperation({ summary: "Get all users." })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: "Create user." })
    @UseGuards(JwtAuthGuard)
    @Post("create")
    createUser(@Body() dto: SignUpDto) {
        return this.usersService.createUser(dto);
    }

    @ApiOperation({ summary: "Update user." })
    @UseGuards(JwtAuthGuard)
    @Patch("update/:id")
    updateUser(@Param() params: { id: string }, @Req() request, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(params.id, request, dto);
    }

    @ApiOperation({ summary: "Delete user." })
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    //@Res({ passthrough: true }) - без passthrough зависає (коли видаляється юзер і виконується  response.clearCookie("token");)
    deleteUser(@Param() params: { id: string }, @Req() request, @Res({ passthrough: true }) response) {
        return this.usersService.deleteUser(params.id, request, response);
    }
}
