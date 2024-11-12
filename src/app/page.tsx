import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>ברוכים הבאים!</h1>
        <h2>בואו נתחיל לבשל</h2>
        <Link className="nav-link" href="/recipes">למתכונים</Link>

      </main>

    </div>
  );
}
