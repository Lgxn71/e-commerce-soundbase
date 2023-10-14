import { FC, CSSProperties } from "react";

import { poppins } from "../../../src/pages/_app";

import styles from "./PageTitle.module.css";

interface PageTitleProps {
  isCenter?: boolean;
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, isCenter }) => {
  return (
    <h2
      style={isCenter ? { textAlign: "center" } : undefined}
      className={`${poppins.className} ${styles.title}`}
    >
      {title}
    </h2>
  );
};

export default PageTitle;
