import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { inter } from "@/pages/_app";

import styles from "./GradientButton.module.css";

const GradientButton = ({ children, href }) => {
  return (
    <Link href={href}>
      <button className={`${inter.variable} ${styles.gradientButton}`}>
        <div className={styles.background}>
          <FontAwesomeIcon icon={faArrowRight} rotation={180} />
          <span> </span>
          <span> </span>
          {children}
        </div>
      </button>
    </Link>
  );
};

export default GradientButton;
