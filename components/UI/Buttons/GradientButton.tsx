import { FC, ReactNode } from "react";

import Link from "next/link";

import Icons from "../Icons/Icons";

import { inter } from "../../../src/pages/_app";

import styles from "./GradientButton.module.css";

interface GradientButtonProps {
  href: string;
  children: ReactNode;
}

const GradientButton: FC<GradientButtonProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <button className={`${inter.variable} ${styles.gradientButton}`}>
        <div className={styles.background}>
          <Icons.ArrowLeft />
          {"  "}
          {children}
        </div>
      </button>
    </Link>
  );
};

export default GradientButton;
