import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    singup() {
        return this.authService.signup();
    }

    @Post("signin")
    singin() {
        return this.authService.signin();
    }

    @Get("signout")
    singout() {
        return this.authService.signout();
    }
}
