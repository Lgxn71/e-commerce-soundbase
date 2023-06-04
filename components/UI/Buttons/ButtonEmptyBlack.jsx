import { inter } from "@/pages/_app";
import styles from "./ButtonEmptyBlack.module.css";
const ButtonEmptyBlack = ({ children }) => {
  return (
    <button className={`${inter.variable} ${styles.button}`}>{children}</button>
  );
};

export default ButtonEmptyBlack;
