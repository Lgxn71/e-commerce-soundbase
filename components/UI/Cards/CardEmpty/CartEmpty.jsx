import styles from "./CardEmpty.module.css";
const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
