import type { Photo, Photographer } from "../db/schema.ts";

export type PhotoWithDetails = {
  photo: Photo;
  categorySlug: string;
  photographer: Photographer;
};
