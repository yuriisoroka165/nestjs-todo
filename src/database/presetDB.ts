import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { hashPassword } from "src/utils/password";
import { PresetDBDto } from "./dto/presetDB.dto";
import { validatePresetEnv } from "src/utils/validatePresetEnv";

@Injectable()
export class PresetDB {
    constructor(private readonly databaseService: DatabaseService) {}

    async preset() {
        const env = validatePresetEnv();
        const { ADMIN_LOGIN, ADMIN_EMAIL, ADMIN_FULL_NAME, ADMIN_PASSWORD } = env;

        await this.databaseService.user.upsert({
            where: {
                login: ADMIN_LOGIN,
            },
            create: {
                login: ADMIN_LOGIN,
                email: ADMIN_EMAIL,
                fullName: ADMIN_FULL_NAME,
                password: await hashPassword(ADMIN_PASSWORD),
                permissions: "ADMIN",
            },
            update: {
                email: ADMIN_EMAIL,
                fullName: ADMIN_FULL_NAME,
                password: await hashPassword(ADMIN_PASSWORD),
                permissions: "ADMIN",
            },
        });
    }
}
