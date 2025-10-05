import type { Metadata } from "next"
import Image from "next/image"
import { relative } from "path"

export const metadata: Metadata = {
  title: "About us",
  description: "Description on About page",
}

export default function About() {
  return (
    <>
      <h1>About this project (QA version)</h1>
      <div style={{
        width: "100%",
        height: "300px",
        position: "relative",
      }}>
      <Image
        src={"/mountains.jpg"}
        alt="mountains"
        // width={800}
        // height={500}
        // style={{width: "100%", height: "auto"}}
        // quality={20}
        // sizes="(max-width: 768px) 50px, (max-width:1200px) 50vw, 1200px"
        fill
        style={{ objectFit: 'cover' }}
      />
      </div>
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
