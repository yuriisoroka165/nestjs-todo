import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { PresetDBDto } from "src/database/dto/presetDB.dto";

export function validatePresetEnv() {
    const envObj = plainToInstance(PresetDBDto, process.env, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(envObj, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        const messages = errors.map(err => Object.values(err.constraints ?? {}).join(", ")).join("; ");

        throw new Error("ENV validation failed: " + messages);
    }

    return envObj as PresetDBDto;
}
