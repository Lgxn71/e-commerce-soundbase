import { poppins } from "@/pages/_app";

import styles from "./Container.module.css";

const Container = ({ isBorderThere, children }) => {
  return (
    <section className={isBorderThere ? styles.border : ""}>
      <div
        className={`
        ${poppins.variable}
        ${styles.container}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Container;
