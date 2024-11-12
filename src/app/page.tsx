import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>עמוד ראשי</p>

        <Link className="nav-link" href="/recipes">לינק למתכונים</Link>

      </main>
      
    </div>
  );
}
