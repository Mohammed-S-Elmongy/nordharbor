export type Photographer = { slug: string; displayName: string };

export type Photo = {
  id: number;
  slug: string;
  title: string;
  description: string;
  instagramUrl: string | null;
  location: string | null;
  camera: string;
  lens: string | null;
  featured: boolean;
  category: string;
  photographer: Photographer;
};
