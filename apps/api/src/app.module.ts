import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ConfigModule } from "@nestjs/config";
import { PhotosModule } from "./photos/photos.module.js";
import { DrizzleModule } from "@nestjs/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { ConfigService } from "@nestjs/config";
import * as schema from "./db/schema.ts";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: "../../.env" }),
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        drizzle,
        connection: {
          host: configService.get<string>("DB_HOST", "localhost"),
          port: Number(configService.get<string>("DB_PORT", "5432")),
          user: configService.getOrThrow<string>("DB_USER"),
          password: configService.getOrThrow<string>("DB_PASSWORD"),
          database: configService.getOrThrow<string>("DB_NAME"),
        },
        schema,
      }),
    }),
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
