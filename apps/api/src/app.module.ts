import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ConfigModule } from "@nestjs/config";
import { PhotosModule } from "./photos/photos.module.js";
import { DrizzleModule } from "@nestjs/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema.ts";
import { getDbConfig } from "./config/database.ts";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: "../../.env" }),
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        drizzle,
        connection: getDbConfig(),
        schema,
      }),
    }),
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
