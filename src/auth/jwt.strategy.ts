import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JWT_SECRET } from "src/utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // JWT_SECRET! - not ok
        super({ jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]), secretOrKey: JWT_SECRET! });
    }

    private static extractJWT(request: Request): string | null {
        if (request.cookies && "token" in request.cookies) {
            return request.cookies.token;
        }

        return null;
    }

    async validate(payload: { id: string; login: string; permissions: string }) {
        return payload;
    }
}
