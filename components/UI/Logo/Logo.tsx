import { memo } from "react";
import styles from "./Logo.module.css";

const Logo = memo(function Logo() {
  return (
    <>
      <span className={styles.sound}>sound</span>
      <span className={styles.base}>base</span>
    </>
  );
});

export default Logo;
