import { describe, expect, it } from "vitest";
import { toPhotoResponseDto } from "./photo.mapper.js";
import type { PhotoWithDetails } from "./types.ts";

describe("toPhotoResponseDto", () => {
  it("returns only the intended public photo fields", () => {
    const databaseResult: PhotoWithDetails = {
      photo: {
        id: 1,
        slug: "the-young-king",
        title: "The Young King",
        description: "A young lion.",
        categoryId: 1,
        photographerId: 1,
        camera: "Canon EOS R10",
        lens: null,
        location: null,
        instagramUrl: null,
        featured: false,
      },
      categorySlug: "wildlife",
      photographer: {
        id: 1,
        slug: "morgyphoto",
        displayName: "MorgyPhoto",
      },
    };

    const result = toPhotoResponseDto(databaseResult);

    expect(result).toEqual({
      id: 1,
      slug: "the-young-king",
      title: "The Young King",
      description: "A young lion.",
      category: "wildlife",
      photographer: {
        slug: "morgyphoto",
        displayName: "MorgyPhoto",
      },
      camera: "Canon EOS R10",
      lens: null,
      location: null,
      instagramUrl: null,
      featured: false,
    });

    expect(result).not.toHaveProperty("categoryId");
    expect(result).not.toHaveProperty("photographerId");
    expect(result.photographer).not.toHaveProperty("id");
  });
});
