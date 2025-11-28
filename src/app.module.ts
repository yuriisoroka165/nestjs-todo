import { Module, OnModuleInit } from "@nestjs/common";

import { DatabaseModule } from "./database/database.module";
import { TodosModule } from "./todos/todos.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PresetDB } from "./database/presetDB";

@Module({
    imports: [DatabaseModule, TodosModule, AuthModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly presetDB: PresetDB) {}

    async onModuleInit() {
        await this.presetDB.preset();
    }
}
