import type { GetStaticProps } from "next";

import styles from './posts.module.css';
import Link from "next/link";

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
            <Link key={id} href={`/posts/${id}`} className={styles.card}>
              <li>
                <p className={styles.title}>{title}</p>
                <p className={styles.body}>{body}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsPromise = await fetch(API_URL)
  const posts = await postsPromise.json();
  return { props: { posts } };
}
