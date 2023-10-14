import { FC, ReactNode } from "react";
import styles from "./CardWithHeader.module.css";

interface ICardWithHeaderProps {
  body: ReactNode;
  header: ReactNode;
}

const CardWithHeader: FC<ICardWithHeaderProps> = ({ body, header }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};

export default CardWithHeader;
