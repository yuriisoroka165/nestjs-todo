import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // http://localhost:3000/api
    app.setGlobalPrefix("api");

    // параметр whitelist: true видаляє всі властивості, яких немає в DTO.
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.use(cookieParser());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
