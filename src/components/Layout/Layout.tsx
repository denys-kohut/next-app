import { FC } from 'react';
import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode
}

export const Layout:FC<LayoutProps> = ({children}) => {
  return (
    <>
      <header>
        <div className={styles.container}>
          <span>My Blog</span>
        </div>
      </header>
      <main>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <footer>
        <div className={styles.container}>
          <p>©2025 My Blog. All rights reserved</p>
        </div>
      </footer>
    </>
  )
}
