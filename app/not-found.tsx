import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "404 Page Not Found – Jet",
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <p>Sorry, we can&apos;t find the page you&apos;re looking for.</p>
      <div className={styles.actions}>
        <Link className={styles.home} href="/">
          Back to home
        </Link>
        <Link className={styles.let} href="/contact">
          Let us know
        </Link>
      </div>
    </div>
  );
}
