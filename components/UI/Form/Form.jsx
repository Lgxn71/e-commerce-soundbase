import Link from "next/link";

import GradientButton from "../Buttons/GradientButton";

import { poppins } from "@/pages/_app";

import styles from "./Form.module.css";

const Form = ({
  title,
  text,
  hrefLink,
  hrefText,
  children,
  formSubmitHandler,
}) => {
  return (
    <main className={`${styles.body} ${poppins.variable}`}>
      <div className={styles.gradientContainer}>
        <aside></aside>
      </div>

      <div className={styles.form}>
        <GradientButton href="/">Get back to homepage</GradientButton>
        {/* add link */}

        <form onSubmit={formSubmitHandler}>
          <div className={styles.header}>
            <h4>{title}</h4>
            <p>
              {text} have an account yet?{" "}
              <Link href={hrefLink} className={styles.changeForm}>
                {hrefText}
              </Link>
              {/* hrefLink */}
            </p>
          </div>
          {children}

          <button className={styles.buttonSubmit}>{title}</button>
        </form>
      </div>
    </main>
  );
};

export default Form;
