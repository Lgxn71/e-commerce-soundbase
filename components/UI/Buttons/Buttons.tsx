import { ReactNode, MouseEventHandler, FC, ButtonHTMLAttributes } from "react";

import Link from "next/link";

import Icons from "../Icons/Icons";

import { inter, poppins } from "../../../src/pages/_app";

import styles from "./Buttons.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
}

interface IButtonsObj {
  White: FC<IButtonProps>;
  EmptyBlack: FC<IButtonProps>;
  Violet: FC<IButtonProps>;
  Gradient: FC<IButtonProps>;
  Gray: FC<IButtonProps>;
  WhiteForm: FC<IButtonProps>;
}

const Buttons: IButtonsObj = {
  White: ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`${inter.variable} ${styles.buttonWhite}`}
      >
        {children}
      </button>
    );
  },
  EmptyBlack: ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`${inter.variable} ${styles.buttonEmptyBlack}`}
      >
        {children}
      </button>
    );
  },

  Violet: ({ children }) => {
    return (
      <button className={`${poppins.variable} ${styles.buttonViolet}`}>
        {children}
      </button>
    );
  },
  Gradient: ({ href, children }) => {
    return (
      <Link href={href!}>
        <button className={`${inter.variable} ${styles.gradientButton}`}>
          <div className={styles.background}>
            <Icons.ArrowLeft />
            {"  "}
            {children}
          </div>
        </button>
      </Link>
    );
  },
  Gray: ({ children }) => (
    <button className={`${styles.grayButton} ${inter.className}`}>
      {children}
    </button>
  ),
  WhiteForm: ({ children }) => (
    <button className={styles.buttonWhiteForm}>{children}</button>
  ),
};

export default Buttons;
