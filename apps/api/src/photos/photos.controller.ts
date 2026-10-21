import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { ErrorResponseDto } from "../common/error-response.dto.js";
import { PhotosService } from "./photos.service.js";
import { toPhotoResponseDto } from "./photo.mapper.js";
import { PhotoResponseDto } from "./dto/photo-response.dto.js";

@ApiTags("photos")
@Controller("photos")
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @ApiOperation({
    summary: "Get a list of photos, optionally filtered by category",
  })
  @ApiQuery({
    name: "category",
    required: false,
    description: "Filter photos by category. Use 'all' to get all photos.",
    example: "wildlife",
  })
  @ApiOkResponse({ type: PhotoResponseDto, isArray: true })
  getPhotos(@Query("category") category?: string): PhotoResponseDto[] {
    const photos = category
      ? this.photosService.getPhotosByCategory(category)
      : this.photosService.getPhotos();
    return photos.map(toPhotoResponseDto);
  }
  //!==================================================================================
  @Get(":slug")
  @ApiOperation({ summary: "Get a photo by its slug" })
  @ApiNotFoundResponse({
    description: "Photo with the specified slug was not found",
    type: ErrorResponseDto,
  })
  @ApiOkResponse({ type: PhotoResponseDto })
  getPhotoBySlug(@Param("slug") slug: string): PhotoResponseDto {
    return toPhotoResponseDto(this.photosService.getPhotoBySlug(slug));
  }
}
