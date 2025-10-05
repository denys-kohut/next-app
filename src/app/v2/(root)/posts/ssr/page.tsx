import { notFound } from "next/navigation";
import Link from "next/link";

import styles from "../posts.module.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=12";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Result =
  | { posts: Post[]; error?: undefined }
  | { posts: []; error: string };

export const dynamic = 'force-dynamic';
// export const revalidate = 60;

async function getPosts(): Promise<Result> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort('timeout'), 5000);

  try {
    const res = await fetch(API_URL, {
      signal: controller.signal,
      // cache: "no-store",
      // cache: "force-cache",
      // next: { revalidate: 0 }
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      return { posts: [], error: `Upstream issues: ${res.statusText}` };
    }

    const posts = (await res.json()) as Post[];
    return { posts };
  } catch (e: unknown) {
    const isAbort =
      e instanceof Error &&
      (e.name === "AbortError" || e.message === "timeout");
    return { posts: [], error: isAbort ? "Request timed out" : "Network/Server error" };
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function Posts() {
  const { posts, error } = await getPosts();

  return (
    <>
      {error && <div className={styles.error}>Failed to load posts: {error}</div>}
      <h1>{Math.random()}</h1>
      {posts.length > 0 && (
        <ul className={styles.grid}>
          { posts.map(({ id, title, body }) => (
            <Link key={id} href={`/v2/posts/${id}`} className={styles.card}>
              <li>
                <p className={styles.title}>{title}</p>
                <p className={styles.body}>{body}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
