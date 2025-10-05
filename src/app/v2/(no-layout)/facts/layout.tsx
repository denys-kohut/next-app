import styles from "./layout.module.css";

export default function FactsLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <section className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <h2 className={styles.heroTitle}>Fun Facts</h2>
          <p className={styles.heroSubtitle}>
            Facts about different stuff
          </p>
        </header>

        <main className={styles.content}>
          {children}
        </main>

        <footer className={styles.footer}>
          ©{new Date().getFullYear()} Facts section
        </footer>
      </div>
    </section>
  );
}
