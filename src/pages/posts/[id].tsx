import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import styles from './posts.module.css';
import Link from "next/link";
import Head from "next/head";


const API = 'https://jsonplaceholder.typicode.com'
const API_URL = `${API}/posts?_limit=12`

type Post = {
  id: string;
  title: string;
  body: string;
}

interface PostsProps {
  post: Post;
  generatedAt: string;
}

export default function PostPage({ post, generatedAt }: PostsProps) {
  const router = useRouter();

  if(router.isFallback) {
    return "...loading"
  }

  return (
    <>
      <Head>
        <title>{post.title} | Post</title>
      </Head>
      <article className={styles.card}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.body}>{post.body}</p>
        <p className={styles.meta}>
          <small>Generate at: <b>{generatedAt}</b></small>
        </p>
      </article>

      <div className={styles.actions}>
        <Link href={'/posts/ssg'} className={styles.card}>← Back to the list</Link>
        <div>
           {+post.id > 1 && <Link href={`/posts/${+post.id - 1}`} className={styles.card}>← Prev</Link>}
           <Link href={`/posts/${+post.id + 1}`} className={styles.card}>Next →</Link>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsPromise = await fetch(API_URL);
  const posts: Post[] = await postsPromise.json();

  return {
    paths: posts.map(post => ({ params: { id: String(post.id) } })),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const postPromise = await fetch(`${API}/posts/${id}`);
  if(!postPromise.ok) {
    return { notFound: true };
  }

  const post = await postPromise.json();
  if(!post?.id) {
    return { notFound: true };
  }

  return {
    props: { post, generatedAt: new Date().toISOString() },
    revalidate: 60,
  };
}
