import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor() {}

    async signup() {
        return { message: "Signup endpoint" };
    }

    async signin() {
        return { message: "Signin endpoint" };
    }

    async signout() {
        return { message: "Signout endpoint" };
    }
}
