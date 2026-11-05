import type { Photo } from "../../photos/types";
import styles from "./PhotoCard.module.css";
import Image from "next/image";

type PhotoCardProps = { photo: Photo };

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <article className={styles.photoCard}>
      {photo.featured && <span className={styles.featuredBadge}>Featured</span>}
      {photo.previewUrl && (
        <Image
          className={styles.photoImage}
          src={photo.previewUrl}
          alt={photo.title}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      <div className={styles.cardContent}>
        <h3>{photo.title}</h3>

        <p>{photo.description}</p>
        <p>
          by: <strong>{photo.photographer.displayName}</strong>
        </p>
        <p className={styles.category}>{photo.category}</p>
      </div>
    </article>
  );
}
