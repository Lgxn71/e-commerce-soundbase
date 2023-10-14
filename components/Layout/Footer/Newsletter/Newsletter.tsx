import ButtonViolet from "../../../UI/Buttons/ButtonViolet";
import Logo from "../../../UI/Logo/Logo";

import styles from "./Newsletter.module.css";

const NewsLetter = () => {
  return (
    <div className={styles.col1}>
      <h5 className={styles.logo}>
        <Logo />
      </h5>

      <p className={styles.copyright}>© 2023 Soundbase. All rights reserved.</p>

      <div className={styles.newsletter}>
        <p className={styles.newsLetterTitle}>
          Join our email list to receive articles, tips from industry experts,
          and more.
        </p>

        {/* make a form hander */}
        <form className={styles.form} action="">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
          <ButtonViolet>Sign up</ButtonViolet>
        </form>

        <p className={styles.privacyContent}>
          By submitting this form, you acknowledge that you have reviewed the
          terms of our{" "}
          <span className={styles.privacyPolicy}> Privacy Policy.</span>
          {/* talk with aidar privacy policy design */}
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
