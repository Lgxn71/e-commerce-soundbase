import { poppins } from "@/pages/_app";
import styles from "./PageTitle.module.css";

const PageTitle = ({ title, isCenter }) => {
  return (
    <h2
      style={isCenter && { textAlign: "center" }  }
      className={`${poppins.className} ${styles.title}`}
    >
      {title}
    </h2>
  );
};

export default PageTitle;
