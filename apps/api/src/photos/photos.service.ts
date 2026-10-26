import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import { photos, categories, photographers } from "../db/schema.ts";
import * as schema from "../db/schema.ts";
import type { PhotoWithDetails } from "./types.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

@Injectable()
export class PhotosService {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<PhotoWithDetails[]> {
    const result = await this.db
      .select({
        photo: photos,
        categorySlug: categories.slug,
        photographer: photographers,
      })
      .from(photos)
      .innerJoin(categories, eq(photos.categoryId, categories.id))
      .innerJoin(photographers, eq(photos.photographerId, photographers.id));
    return result;
  }

  async findOneBySlug(slug: string): Promise<PhotoWithDetails> {
    const result = await this.db
      .select({
        photo: photos,
        categorySlug: categories.slug,
        photographer: photographers,
      })
      .from(photos)
      .innerJoin(categories, eq(photos.categoryId, categories.id))
      .innerJoin(photographers, eq(photos.photographerId, photographers.id))
      .where(eq(photos.slug, slug))
      .limit(1);
    const photoWithDetails = result[0];

    if (!photoWithDetails) {
      throw new NotFoundException(`Photo with slug "${slug}" not found`);
    }
    return photoWithDetails;
  }

  async findAllByCategory(category: string): Promise<PhotoWithDetails[]> {
    const categorySlug = category.toLowerCase().trim();
    if (categorySlug === "all") {
      return this.findAll();
    }

    const result = await this.db
      .select({
        photo: photos,
        categorySlug: categories.slug,
        photographer: photographers,
      })
      .from(photos)
      .innerJoin(categories, eq(photos.categoryId, categories.id))
      .innerJoin(photographers, eq(photos.photographerId, photographers.id))
      .where(eq(categories.slug, categorySlug));
    return result;
  }
}
