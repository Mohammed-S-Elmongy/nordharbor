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

      <div className={styles.content}>{children}</div>
    </div>
  );
}
