import { describe, expect, it } from "vitest";
import { toPhotoResponseDto } from "./photo.mapper.js";

describe("toPhotoResponseDto", () => {
  it("maps public photo fields and excludes private storage fields", () => {
    const photo = {
      id: 1,
      slug: "the-young-king",
      title: "The young king",
      description: "A Young lion in the wild.",
      instagramUrl:
        "https://www.instagram.com/p/DMTpj4nN6FH/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
      category: "wildlife",
      location: "Norway",
      camera: "Canon EOS 700D",
      lens: "Tamron 70-300mm f/4-5.6 Di LD Macro",
      featured: true,
      storageKey: "the-young-king.jpg",
    };

    const result = toPhotoResponseDto(photo);
    //!expect result to not include individual private fields like storageKey
    expect(result).not.toHaveProperty("storageKey");
    expect(result).toEqual({
      id: 1,
      slug: "the-young-king",
      title: "The young king",
      description: "A Young lion in the wild.",
      instagramUrl:
        "https://www.instagram.com/p/DMTpj4nN6FH/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
      category: "wildlife",
      location: "Norway",
      camera: "Canon EOS 700D",
      lens: "Tamron 70-300mm f/4-5.6 Di LD Macro",
      featured: true,
    });
  });
});