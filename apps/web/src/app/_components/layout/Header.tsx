import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
// import { ChevronDown } from "lucide-react";

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
            <Link
              href="/photos"
              className={styles.navLinkCategory}
            >
              Gallery
              {/* <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" /> */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
