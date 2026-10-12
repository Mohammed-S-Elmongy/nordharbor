import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("NordHarbor API")
    .setDescription("API documentation for NordHarbor")
    .setVersion("1.0")
    .build();

  const documentBuilder = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, documentBuilder);

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
