import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto/auth.dto";
import { JwtAuthGuard } from "./jwt.guard";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    singup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto);
    }

    @Post("signin")
    singin(@Body() dto: SignInDto, @Req() request, @Res() response) {
        return this.authService.signin(dto, request, response);
    }

    @UseGuards(JwtAuthGuard)
    @Get("signout")
    singout(@Req() request, @Res() response) {
        return this.authService.signout(request, response);
    }
}
