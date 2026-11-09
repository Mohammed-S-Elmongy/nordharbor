import styles from "./Hero.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.title}>photography for a wilder world</p>

        <h1 className={styles.heading}>
          Extraordinary
          <br />
          Images. Real Places.
        </h1>

        <p className={styles.description}>
          NordHarbor is a premium photography marketplace and portfolio platform
          for nature, <strong>wildlife</strong> and the Nordic outdoors. Discover extraordinary
          perspectives from the world&apos;s most talented photographers.
        </p>
        <div className={styles.actions}>
          <Link
            href="/photos"
            className={`${styles.heroButton} ${styles.primaryButton}`}
          >
            Explore Gallery
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
          <a
            href="#featured"
            className={`${styles.heroButton} ${styles.secondaryButton}`}
          >
            View Featured
          </a>
        </div>
      </div>
    </section>
  );
}
