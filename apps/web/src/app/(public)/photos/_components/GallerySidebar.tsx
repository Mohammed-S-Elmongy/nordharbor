import Link from "next/link";
import styles from "./GallerySidebar.module.css";

const categories = [
  { label: "All Photos", slug: "all" },
  { label: "Wildlife", slug: "wildlife" },
  { label: "Landscapes", slug: "landscapes" },
  { label: "Astro", slug: "astro" },
  { label: "Macro", slug: "macro" },
];

type GallerySidebarProps = { activeCategory: string };

export default function GallerySidebar({
  activeCategory,
}: GallerySidebarProps) {
  return (
    <aside aria-label="Gallery filters">
      <h2>Categories</h2>

      <nav aria-label="Photo categories">
        <ul className={styles.categoryList}>
          {categories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <li key={category.slug}>
                <Link
                  href={`/photos?category=${category.slug}`}
                  className={`${styles.categoryLink} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {category.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
