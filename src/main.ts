import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // http://localhost:3000/api
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder().setTitle("Todos").setDescription("Todos API").setVersion("1.0").addTag("todos").build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    // параметр whitelist: true видаляє всі властивості, яких немає в DTO.
    // forbidNonWhitelisted: true викидає помилку на зайві поля
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.use(cookieParser());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
