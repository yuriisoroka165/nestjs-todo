import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JWT_SECRET } from "src/utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        super({ jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]), secretOrKey: JWT_SECRET });
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
