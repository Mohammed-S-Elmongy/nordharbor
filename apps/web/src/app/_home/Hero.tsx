import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.title}>photography for a wilder world</p>

        <h1 className={`${styles.heading}`}>
          Extraordinary
          <br />
          Images. Real Places.
        </h1>

        <p className={styles.description}>
          NordHarbor is a premium photography marketplace and portfolio platform
          for nature, wildlife and the Nordic outdoors. Discover extraordinary
          perspectives from the world's most talented photographers.
        </p>
      </div>
    </section>
  );
}
