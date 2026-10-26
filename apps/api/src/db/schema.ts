import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});
export type Category = typeof categories.$inferSelect;

export const photos = pgTable("photos", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }), // Prevent deleting categories that still contain photographs.
  photographerId: integer("photographer_id")
    .notNull()
    .references(() => photographers.id, { onDelete: "restrict" }), // Prevent deleting photographers that still have photos.
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  camera: text("camera").notNull(),
  lens: text("lens"), // Optional because phones and compact cameras may not have a separately specified lens.
  location: text("location"),
  instagramUrl: text("instagram_url"),
  featured: boolean("featured").notNull().default(false),
});
export type Photo = typeof photos.$inferSelect;

export const photographers = pgTable("photographers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  displayName: text("display_name").notNull(),
  slug: text("slug").notNull().unique(),
});
export type Photographer = typeof photographers.$inferSelect;
