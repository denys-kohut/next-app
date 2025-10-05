import type { Metadata } from "next" 

export async function generateMetadata(): Promise<Metadata> {
  let title;
  try {
    const userDataPromise = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const userData = await userDataPromise.json();
    title = userData.name
  } catch (e) {
    title = "Anonymous";
  }

  return {
    title,
    description: "Description on About page",
  }
}

export default function About() {
  return (
    <>
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
