import type { PhotoWithDetails } from "./types.ts";
import type { PhotoResponseDto } from "./dto/photo-response.dto.js";

export function toPhotoResponseDto(result: PhotoWithDetails): PhotoResponseDto {
  const { photo, categorySlug, photographer } = result;

  return {
    id: photo.id,
    slug: photo.slug,
    title: photo.title,
    description: photo.description,
    instagramUrl: photo.instagramUrl,
    location: photo.location,
    camera: photo.camera,
    lens: photo.lens,
    featured: photo.featured,
    category: categorySlug,
    photographer: {
      slug: photographer.slug,
      displayName: photographer.displayName,
    },
  };
}
