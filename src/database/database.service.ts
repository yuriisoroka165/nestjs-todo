import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient {
    // створення підключення до бази даних
    async onModuleInit() {
        await this.$connect();
    }

    // закриття підключення до бази даних при завершенні роботи модуля
    async onModuleDestroy() {
        await this.$disconnect();
    }

    // async enableShutdownHooks(app: INestApplication) {
    //     this.$on("beforeExit", async () => {
    //         await app.close();
    //     });
    // }
}
