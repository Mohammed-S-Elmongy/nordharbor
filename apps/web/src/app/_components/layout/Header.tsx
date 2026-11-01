import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            className={styles.headerLogo}
            src="/NH-logo-light.png"
            alt="NordHarbor Logo"
            width={512}
            height={270}
          />
        </Link>
      </div>

      <nav
        aria-label="Main navigation"
        className={styles.headerNav}
      >
        <ul>
          <li>
            <Link href="/photos">Gallery</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
