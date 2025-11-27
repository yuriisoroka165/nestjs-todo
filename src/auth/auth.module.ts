import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [JwtModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, UsersService],
})
export class AuthModule {}
