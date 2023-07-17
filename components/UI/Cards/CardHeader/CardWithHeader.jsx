import styles from "./CardWithHeader.module.css";
const CardWithHeader = ({ body, header }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};

export default CardWithHeader;
