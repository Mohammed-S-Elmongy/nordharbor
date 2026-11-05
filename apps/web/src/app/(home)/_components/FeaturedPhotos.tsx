import Link from "next/link";
import PhotoCard from "../../_components/photos/PhotoCard";
import type { Photo } from "../../photos/types.ts";
import styles from "./FeaturedPhotos.module.css";
import { ArrowRight } from "lucide-react";

async function getFeaturedPhotos(): Promise<Photo[]> {
  const response = await fetch("http://localhost:3001/photos");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch featured photos. HTTP status: ${response.status}`,
    );
  }

  const photos: Photo[] = await response.json();

  return photos.filter((photo) => photo.featured);
}

export default async function FeaturedPhotos() {
  const photos = await getFeaturedPhotos();

  return (
    <section
      id="featured"
      className={styles.featuredSection}
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeading}>
            <h2>Featured Photos</h2>
            <p>Handpicked images from our collection</p>
          </div>

          <Link
            href="/photos"
            className={styles.viewAll}
          >
            View All Photos
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </Link>
        </div>

        {photos.length === 0 ?
          <p>No featured photographs yet.</p>
        : <ul className={styles.photoGrid}>
            {photos.map((photo) => (
              <li key={photo.id}>
                <PhotoCard photo={photo} />
              </li>
            ))}
          </ul>
        }
      </div>
    </section>
  );
}
