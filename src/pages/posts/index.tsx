import { useState, useEffect } from "react";

import styles from './posts.module.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=12'

type Post = {
  id: string;
  title: string;
  body: string;
}

export default function Posts() {
  const [posts, setPost] = useState<Post[] | null>(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      const postsPromise = await fetch(API_URL, { signal: controller.signal })
      if (!postsPromise.ok) throw new Error(`Request failed: ${postsPromise.status}`);
      const posts = await postsPromise.json();
      setPost(posts);
    }
    try {
      fetchPosts();
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return;
      setError(e instanceof Error ? e.message : 'Unknown error');
    }

    return () => controller.abort();
  }, [])

  return (
    <>
      {error && (
        <div className={styles.error}>
          Failed to load posts: {error}
        </div>
      )}
      {!posts && !error && (
        <ul className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <li key={i} className={`${styles.card} ${styles.skeleton}`}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLine} />
            </li>
          ))}
        </ul>
      )}
      {posts?.length
        ? ( <ul className={styles.grid}>
              { posts.map(({ id, title, body }) => (
                <li key={id} className={styles.card}>
                  <p className={styles.title}>{title}</p>
                  <p className={styles.body}>{body}</p>
              </li>
              ))}
            </ul> )
        : null
      }
    </>
  )
}
