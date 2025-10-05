import { FC } from 'react';
import styles from "./facts.module.css";

interface FactProps {
    title: string;
    description: string;
}

export const Fact:FC<FactProps> = ({
   title, description 
}) => {
    return (
      <div className={styles.fact}>
        <h1>{title}</h1>
        <p className={styles.description}>{description}</p>
        <hr className={styles.hr} />
      </div>
    )
}


