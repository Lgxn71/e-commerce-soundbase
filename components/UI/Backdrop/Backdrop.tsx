import { MouseEventHandler } from "react";
import styles from "./Backdrop.module.css";
const Backdrop = ({
  onClose,
}: {
  onClose: MouseEventHandler<HTMLDivElement>;
}) => {
  return <div onClick={onClose} className={styles.backdrop}></div>;
};

export default Backdrop;
