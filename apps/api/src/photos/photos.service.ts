import { Injectable, NotFoundException } from "@nestjs/common";
import type { Photo } from "./types.js";

@Injectable()
export class PhotosService {
  private readonly photos: Photo[] = [
    {
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
    },
    {
      id: 2,
      slug: "green-snake",
      title: "Green Snake",
      description: "A vibrant green snake in its natural habitat.",
      instagramUrl:
        "https://www.instagram.com/p/Dd1UMBUAMTm/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
      category: "wildlife",
      location: "Norway",
      camera: "Canon EOS R10",
      lens: "Canon RF 55-210mm f/4.5-7.1 IS STM",
      featured: false,
    },
    {
      id: 3,
      slug: "nordic-lynx",
      title: "Nordic Lynx",
      description: "A majestic Nordic lynx in its natural habitat.",
      instagramUrl:
        "https://www.instagram.com/p/Db1ObPIOVlj/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
      category: "notwildlifetest",
      location: "Norway",
      camera: "Canon EOS R10",
      lens: "CANON RF 100-400mm f/4.5-5.6 L IS USM",
      featured: false,
    },
  ];

  getPhotos(): Photo[] {
    return this.photos;
  }

  getPhotoBySlug(slug: string): Photo {
    const photo = this.photos.find((photo) => photo.slug === slug);

    if (!photo) {
      throw new NotFoundException(`Photo with slug "${slug}" not found`);
    }

    return photo;
  }

  getPhotosByCategory(category: string): Photo[] {
  
    if (category.toLowerCase().trim() === "all") {
      return this.getPhotos();
    }

    const photos = this.photos.filter(
      (photo) =>
        photo.category.toLowerCase().trim() ===
        category.toLowerCase().trim(),
    );
    
    return photos;
  }
}
