import { FC, MouseEventHandler, ReactNode, ButtonHTMLAttributes } from "react";
import { inter } from "../../../src/pages/_app";

import styles from "./ButtonEmptyBlack.module.css";

interface ButtonEmptyBlackProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonEmptyBlack: FC<ButtonEmptyBlackProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={`${inter.variable} ${styles.button}`}>
      {children}
    </button>
  );
};

export default ButtonEmptyBlack;
