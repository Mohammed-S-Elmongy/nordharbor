import { Suspense } from "react";
import PhotoCard from "../../_components/photos/PhotoCard";
import GallerySidebar from "./_components/GallerySidebar";
import styles from "./Photos.module.css";
import type { Photo } from "./types.js";

async function GalleryContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category?.trim().toLowerCase() || "all";

  const url =
    activeCategory === "all" ?
      "http://localhost:3001/photos"
    : `http://localhost:3001/photos?category=${encodeURIComponent(activeCategory)}`;

  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos: Photo[] = await result.json();

  return (
    <div className={styles.galleryLayout}>
      <GallerySidebar activeCategory={activeCategory} />

      <div className={styles.galleryResults}>
        <p className={styles.resultsCount}>
          {photos.length} {photos.length === 1 ? "photograph" : "photographs"}
        </p>

        {photos.length === 0 ?
          <p>No photographs found in this category.</p>
        : <ul className={styles.photoGrid}>
            {photos.map((photo) => (
              <li key={photo.id}>
                <PhotoCard photo={photo} />
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default function PhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <main className={styles.galleryPage}>
      <div className="container">
        <header className={styles.galleryHeader}>
          <h1>Explore Photography</h1>
          <p>Discover extraordinary moments from the natural world.</p>
        </header>

        <Suspense fallback={<p>Loading photos...</p>}>
          <GalleryContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
