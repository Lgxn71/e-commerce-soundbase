import { ReactNode } from "react";
import styles from "./CardEmpty.module.css";
const Card = ({ children }: { children: ReactNode }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
