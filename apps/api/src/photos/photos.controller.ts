import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { PhotosService } from "./photos.service.js";
import type { Photo } from "./types.js";

@Controller("photos")
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}
  @ApiQuery({
    name: "category",
    required: false,
    description: "Filter photos by category. Use 'all' to get all photos.",
    example: "wildlife",
  })
  @Get()
  getPhotos(@Query("category") category?: string): Photo[] {
    if (category) {
      return this.photosService.getPhotosByCategory(category);
    }

    return this.photosService.getPhotos();
  }

  @Get(":slug")
  getPhotoBySlug(@Param("slug") slug: string): Photo {
    return this.photosService.getPhotoBySlug(slug);
  }
}
