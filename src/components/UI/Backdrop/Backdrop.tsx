import { MouseEventHandler } from "react";
import styles from "./Backdrop.module.css";
const Backdrop = ({
  onClose,
  zIndex,
}: {
  onClose: MouseEventHandler<HTMLDivElement>;
  zIndex?: number;
}) => {
  return (
    <div
      style={{ zIndex: zIndex }}
      onClick={onClose}
      className={styles.backdrop}
    />
  );
};

export default Backdrop;
