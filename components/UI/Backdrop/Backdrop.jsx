import styles from "./Backdrop.module.css";
const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={styles.backdrop}></div>;
};

export default Backdrop;
