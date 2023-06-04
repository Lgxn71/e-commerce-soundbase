import { inter } from "@/pages/_app";
import styles from "./ButtonEmptyBlack.module.css";
const ButtonEmptyBlack = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={`${inter.variable} ${styles.button}`}>
      {children}
    </button>
  );
};

export default ButtonEmptyBlack;
