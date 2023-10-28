import React, { FC, FormEvent, ReactNode } from "react";

import Link from "next/link";

import GradientButton from "../Buttons/GradientButton";
import Logo from "../Logo/Logo";

import { poppins } from "../../../src/pages/_app";

import Icons from "../Icons/Icons";

import styles from "./Form.module.css";

interface IFormProps {
  title: string;
  text: string;
  hrefLink: string;
  hrefText: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  children: ReactNode;
  isLoading: boolean;
}

const Form: FC<IFormProps> = ({
  title,
  text,
  hrefLink,
  hrefText,
  children,
  onSubmit,
  isLoading,
}) => {
  return (
    <main className={`${styles.body} ${poppins.variable}`}>
      <div className={styles.gradientContainer}>
        <aside />
      </div>

      <div className={styles.form}>
        <GradientButton href="/">Get back to homepage</GradientButton>
        <form onSubmit={onSubmit}>
          <div className={styles.header}>
            <h4>{title}</h4>
            <p>
              {text} have an account yet?{" "}
              <Link href={hrefLink} className={styles.changeForm}>
                {hrefText}
              </Link>
            </p>
          </div>
          {children}

          <button className={styles.buttonSubmit}>
            {isLoading && <Icons.Loader />}

            {title}
          </button>

          <div className={styles.logoContainer}>
            <Logo />
            <p className={poppins.className}>© 2023 All Rights Reserved</p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
