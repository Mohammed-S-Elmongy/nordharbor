import Header from "../_components/layout/Header";
import styles from "./layout.module.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.homeLayout}>
      <div
        className={styles.background}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <Header />
        {children}
      </div>
    </div>
  );
}
