import { Injectable } from "@nestjs/common";

import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UsersService {
    constructor(private databaseService: DatabaseService) {}

    async getUser(id: string) {}

    async getAllUsers() {
        return await this.databaseService.user.findMany({ select: { id: true, login: true, email: true, fullName: true } });
    }
}
