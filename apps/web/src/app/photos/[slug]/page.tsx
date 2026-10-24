import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Photo } from "../types.js";

async function PhotoDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await fetch(`http://localhost:3001/photos/${slug}`);

  if (result.status === 404) {
    notFound();
  }

  if (!result.ok) {
    throw new Error("Failed to fetch photo");
  }

  const photo: Photo = await result.json();

  return (
    <div>
      <h1>{photo.title}</h1>
      <p>{photo.description}</p>
    </div>
  );
}

export default function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading photo...</p>}>
      <PhotoDetails params={params} />
    </Suspense>
  );
}
