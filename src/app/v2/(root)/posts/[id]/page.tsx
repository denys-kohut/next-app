import Link from "next/link";
import styles from "../posts.module.css";
import { notFound } from "next/navigation";

const API = 'https://jsonplaceholder.typicode.com'
const API_URL = `${API}/posts?_limit=12`

export const revalidate = 60;

type Post = {
  id: number;
  title: string;
  body: string;
};

async function getPost(params: Promise<{ id: string }>): Promise<Post | null> {
  const { id } = await params;
  const res = await fetch(`${API}/posts/${id}`, { next: { revalidate: 3 } });

  if (!res.ok) return null;
  const data = (await res.json()) as Post;
  return data?.id ? data : null;
}

export async function generateStaticParams() {
  const res = await fetch(API_URL);
  const posts = (await res.json()) as Post[];
  return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPost(params);
  if (!post) return { title: "Post not found" };
  return { title: `${post.title} | Post` };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPost(params);
  if (!post) notFound();

  const generatedAt = new Date().toISOString();

  return (
    <>
      <article className={styles.card}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.body}>{post.body}</p>
        <p className={styles.meta}>
          <small>
            Generate at: <b>{generatedAt}</b>
          </small>
        </p>
      </article>

      <div className={styles.actions}>
        {/* <Link href="/posts/ssg" className={styles.card}>
          ← Back to the list
        </Link> */}
        <div>
          {post.id > 1 && (
            <Link href={`v2/posts/${post.id - 1}`} className={styles.card}>
              ← Prev
            </Link>
          )}
          <Link href={`v2/posts/${post.id + 1}`} className={styles.card}>
            Next →
          </Link>
        </div>
      </div>
    </>
  );
}
