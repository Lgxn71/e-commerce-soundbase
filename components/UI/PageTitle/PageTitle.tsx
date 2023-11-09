import { poppins } from "../../../src/pages/_app";

import styles from "./PageTitle.module.css";

const PageTitle = ({
  title,
  isCenter,
}: {
  title: string;
  isCenter?: boolean;
}) => {
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
