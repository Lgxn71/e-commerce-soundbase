import React, { FC, FormEvent, ReactNode } from "react";

import Link from "next/link";

import Logo from "../Logo/Logo";

import Buttons from "../Buttons/Buttons";
import Icons from "../Icons/Icons";

import styles from "./Form.module.css";

import { poppins } from "../../../src/pages/_app";

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
        <Buttons.Gradient href="/">Get back to homepage</Buttons.Gradient>
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

          <div className={styles.buttonContainer}>
            <Buttons.WhiteForm>
              {isLoading && <Icons.Loader />}

              {title}
            </Buttons.WhiteForm>
          </div>

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
