import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { PhotosModule } from './photos/photos.module.js';

@Module({
  imports: [PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
