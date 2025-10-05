"use client"

import Link from 'next/link';
import styles from './blog.module.css';

export default function Blog() {
  return (
    <>
      <h1>Welcome to the Blog</h1>
      <p>This page is my personal blog with different posts and articles</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias expedita ipsam voluptas veritatis perferendis quidem sit nisi? Ipsam quod labore autem. Vitae blanditiis fugiat iusto vero sint animi fugit sit molestias nulla labore doloremque dolores sapiente, aut dolor necessitatibus voluptatem ut beatae incidunt? Dicta itaque neque, recusandae enim sapiente laudantium sunt expedita hic, cum doloribus provident fugit accusamus maxime consequatur omnis esse possimus? Laudantium ipsum ullam vel nihil, nulla at quibusdam, eos unde illum et cumque eius quo voluptas, recusandae quas beatae sapiente error. Officia nostrum ut, ratione magnam itaque aperiam, sunt quos quam temporibus perferendis architecto suscipit expedita, dolorum necessitatibus cupiditate! Eaque nisi id inventore facilis, corporis hic perspiciatis provident animi ducimus repellendus culpa non reprehenderit at eos nobis cumque labore commodi reiciendis? Asperiores, harum sint? Rem cupiditate soluta hic accusantium eveniet, recusandae, quia aut id nam reprehenderit quo modi officia nobis. Sapiente voluptates vel accusantium, fugiat autem, suscipit fuga iure animi repellendus eius in id voluptatem nobis corporis, molestias inventore aperiam voluptas dolor rerum neque sunt cupiditate. Ab rerum reiciendis non, ducimus, commodi earum hic exercitationem minus illum, expedita pariatur adipisci? Veniam quos natus dolores inventore laudantium sequi dolorum numquam odio quasi asperiores? Tempora amet nam nihil quia!</p>

      <div className={styles.spacer} />

      <section className={styles.prefetchSection}>
        <ul className={styles.linkList}>
          <li>
            <Link href="/facts/banana">🔵 /facts/banana (prefetch ON, default)</Link>
          </li>
          <li>
            <Link href="/about" prefetch={false}>
              ⚪ /about (prefetch OFF)
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
