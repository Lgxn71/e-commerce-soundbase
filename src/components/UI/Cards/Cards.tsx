import { FC, ReactNode } from "react";

import styles from "./Cards.module.css";
interface ICardProps {
  children?: ReactNode;
  body?: ReactNode;
  header?: ReactNode;
}

interface ICardsProps {
  Empty: FC<ICardProps>;
  WithHeader: FC<ICardProps>;
}

const Cards: ICardsProps = {
  Empty: ({ children }) => <div className={styles.card}>{children}</div>,

  WithHeader: ({ header, body }) => (
    <div className={styles.cardHeader}>
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{body}</div>
    </div>
  ),
};

export default Cards;
