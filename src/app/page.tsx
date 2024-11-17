import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>My Recipes</h1>
        <h2>Lets Start Cooking :)</h2>
        <Link className={styles.navLink} href="/recipes">Recipes</Link>

      </main>

    </div>
  );
}
