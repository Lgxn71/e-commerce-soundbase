import { ReactNode } from "react";

import { poppins } from "../../../src/pages/_app";

import styles from "./ButtonViolet.module.css";

const ButtonViolet = ({ children }: { children: ReactNode }) => {
  return (
    <button className={`${poppins.variable} ${styles.button}`}>
      {children}
    </button>
  );
};

export default ButtonViolet;
