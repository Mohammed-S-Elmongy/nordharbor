import type { Category } from "./types";
import type { JSX } from "react";
import Link from "next/link";
import styles from "./CategoryNavigation.module.css";
import {
  Blocks,
  Galaxy,
  MountainSnow,
  PawPrint,
  Snail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CategoryNavigation(): JSX.Element {
  const categories: Category[] = [
    {
      icon: Blocks,
      label: "All",
      description: "Explore everything",
      href: "/photos",
    },
    {
      icon: PawPrint,
      label: "Wildlife",
      description: "Animals in their element",
      href: "/photos?category=wildlife",
    },
    {
      icon: MountainSnow,
      label: "Landscapes",
      description: "Mountains, forests, coast",
      href: "/photos?category=landscapes",
    },
    {
      icon: Galaxy,
      label: "Astro",
      description: "Night skies",
      href: "/photos?category=astro",
    },
    {
      icon: Snail,
      label: "Macro",
      description: "Close-up shots",
      href: "/photos?category=macro",
    },
  ];

  return (
    <nav
      aria-label="Photo categories"
      className={styles.categoryNavWrapper}
    >
      <ul className={styles.categoryNav}>
        {categories.map((category) => {
          const { icon, label, description, href } = category;
          const Icon = icon;

          return (
            <li
              key={label}
              className={styles.categoryItem}
            >
              <Link
                href={href}
                className={styles.categoryLink}
              >
                <Icon
                  className={styles.categoryIcon}
                  size={32}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryLabel}>{label}</span>
                  <span className={styles.categoryDescription}>
                    {description}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
