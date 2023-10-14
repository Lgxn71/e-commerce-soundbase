import { FC, ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

import { inter } from "../../../src/pages/_app";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={`${inter.variable} ${styles.button}`}>
      {children}
    </button>
  );
};

export default Button;
