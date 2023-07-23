import { inter } from "../../../src/pages/_app";

import styles from "./Button.module.css";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={`${inter.variable} ${styles.button}`}>
      {children}
    </button>
  );
};

export default Button;
