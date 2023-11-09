import Buttons from "../../../UI/Buttons/Buttons";
import Logo from "../../../UI/Logo/Logo";

import styles from "./Newsletter.module.css";

const NewsLetter = () => {
  return (
    <div className={styles.col1}>
      <div>
        <h5 className={styles.logo}>
          <Logo />
        </h5>
        <p className={styles.copyright}>
          © 2023 Soundbase. All rights reserved.
        </p>
      </div>

      <div className={styles.newsletter}>
        <p className={styles.newsLetterTitle}>
          Join our email list to receive articles, tips from industry experts,
          and more.
        </p>
        <form className={styles.form} action="">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
          <div className={styles.buttonMobile}>
            <Buttons.Violet>Sign up</Buttons.Violet>
          </div>
        </form>

        <p className={styles.privacyContent}>
          By submitting this form, you acknowledge that you have reviewed the
          terms of our{" "}
          <span className={styles.privacyPolicy}> Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
