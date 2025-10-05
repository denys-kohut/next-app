import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About us</title>
        <meta name="description" content="Description on About page" />
      </Head>
      <h1>About this project</h1>
      <p>
        This project is a practical guide to modern Next.js. Here, you`ll find clear explanations and real code examples for every major topic – routing, rendering, data fetching, deployment, and more.
      </p>
      <p>
        <b>Why</b>
        Because learning Next.js shouldn`t be confusing or boring.
      </p>
    </>
  )
}
