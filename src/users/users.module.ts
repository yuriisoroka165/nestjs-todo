import { Module } from "@nestjs/common";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
