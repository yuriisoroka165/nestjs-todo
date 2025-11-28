import { Global, Module } from "@nestjs/common";

import { DatabaseService } from "./database.service";
import { PresetDB } from "./presetDB";

@Global()
@Module({
    providers: [DatabaseService, PresetDB],
    exports: [DatabaseService, PresetDB],
})
export class DatabaseModule {}
