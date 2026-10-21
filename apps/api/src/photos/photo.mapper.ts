import type { Photo } from "./types.js";
import { PhotoResponseDto } from "./dto/photo-response.dto.js";

export function toPhotoResponseDto(photo: Photo): PhotoResponseDto {
  return {
    id: photo.id,
    slug: photo.slug,
    title: photo.title,
    description: photo.description,
    instagramUrl: photo.instagramUrl,
    category: photo.category,
    location: photo.location,
    camera: photo.camera,
    lens: photo.lens,
    featured: photo.featured,
  };
}
