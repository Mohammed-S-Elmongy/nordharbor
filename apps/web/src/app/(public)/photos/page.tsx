import { Suspense } from "react";
import PhotoCard from "../../_components/photos/PhotoCard";
import styles from "./Photos.module.css";
import type { Photo } from "./types.js";

async function PhotosList({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const url =
    !category || category === "all" ?
      "http://localhost:3001/photos"
    : `http://localhost:3001/photos?category=${encodeURIComponent(category)}`;

  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos: Photo[] = await result.json();

  return (
    <div>
      {photos.length === 0 && <p>No photos found.</p>}

      {photos.length > 0 && (
        <ul className={styles.photoGrid}>
          {photos.map((photo) => (
            <li key={photo.id}>
              <PhotoCard photo={photo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <>
      <main className={styles.galleryPage}>
        <div className="container">
          <h1>Photos</h1>
          <Suspense fallback={<p>Loading photos...</p>}>
            <PhotosList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
