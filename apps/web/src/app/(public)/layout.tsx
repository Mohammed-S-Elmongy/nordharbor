import Header from "../_components/layout/Header";
import styles from "./layout.module.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.publicLayout}>
      <div className={styles.headerLayer}>
        <Header />
      </div>
      <div className={styles.pageLayer}>{children}</div>
    </div>
  );
}
