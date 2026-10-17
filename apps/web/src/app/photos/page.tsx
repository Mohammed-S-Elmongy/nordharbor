import Link from "next/link";
import type { Photo } from "./types.js";

export default async function PhotosPage({
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
      <h1>Photos</h1>
      {photos.length === 0 && <p>No photos found.</p>}
      <ul>
        {photos.map((photo) => {
          const {
            id,
            slug,
            title,
            description,
            instagramUrl,
            location,
            camera,
            lens,
          } = photo;

          return (
            <li key={id}>
              <h2>{title}</h2>
              <p>{description}</p>
              <p>
                Instagram: <a href={instagramUrl}>{instagramUrl}</a>
              </p>
              <p>Category: {photo.category}</p>
              <p>Location: {location}</p>
              <p>Camera: {camera}</p>
              <p>Lens: {lens}</p>
              <Link href={`/photos/${slug}`}>View Details</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
