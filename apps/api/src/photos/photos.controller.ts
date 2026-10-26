import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { ErrorResponseDto } from "../common/dto/error-response.dto.js";
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
  async findAll(
    @Query("category") category?: string,
  ): Promise<PhotoResponseDto[]> {
    const photos = category
      ? await this.photosService.findAllByCategory(category)
      : await this.photosService.findAll();
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
  async findOneBySlug(@Param("slug") slug: string): Promise<PhotoResponseDto> {
    const photo = await this.photosService.findOneBySlug(slug);
    return toPhotoResponseDto(photo);
  }
}
