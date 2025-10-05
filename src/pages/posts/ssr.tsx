import type { GetServerSideProps } from "next";

import styles from './posts.module.css';


const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=12'

type Post = {
  id: string;
  title: string;
  body: string;
}

interface PostsProps {
  posts: Post[];
  error: string;
}

export default function Posts({ posts, error }: PostsProps) {
  return (
    <>
      { error && (
        <div className={styles.error}>Failed to load posts: {error}</div>
      )}
      { posts && (
        <ul className={styles.grid}>
          { posts.map(({ id, title, body }) => (
            <li key={id} className={styles.card}>
              <p className={styles.title}>{title}</p>
              <p className={styles.body}>{body}</p>
          </li>
          ))}
        </ul>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort('timeout'), 5000);

  try {
    const postsPromise = await fetch(API_URL, { signal: controller.signal })
    if(postsPromise.status === 404) {
      return { notFound: true };
    }
    if (!postsPromise.ok) {
      res.statusCode = 502;
      return { props: { error: `Upstream issues: ${postsPromise.statusText}` }}
    }
    const posts = await postsPromise.json();

    return { props: { posts }};
  } catch (e) {
    const isAbort = e instanceof Error && e.name === 'AbortError';
    res.statusCode = isAbort ? 504 : 500;
    return { props: { error: isAbort ? "Request timed out" : "Network/Server error" } };
  }
   finally {
    clearTimeout(timeoutId);
   }
}
