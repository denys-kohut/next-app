import Link from "next/link";
import { useRouter } from "next/router";
import styles from './404.module.css'

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <h1>404 - Page Not Found 🚫</h1>
      <p>Oops! Looks like you took a wrong turn on the internet 🧭</p>
      <div className={styles.navigation}>
        <button onClick={() => router.back()}>⬅️ Go Back</button>
        <Link href="/">🏠 Go Home</Link>
      </div>
    </>
  );
}
