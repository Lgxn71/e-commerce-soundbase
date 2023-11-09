import { FC, ReactNode } from "react";

import styles from "./Container.module.css";

import { poppins } from "../../../pages/_app";
interface ContainerProps {
  isBorderThere?: boolean;
  children: ReactNode;
}
const Container: FC<ContainerProps> = ({ isBorderThere, children }) => {
  return (
    <section className={isBorderThere ? styles.border : ""}>
      <div className={` ${poppins.variable} ${styles.container}`}>
        {children}
      </div>
    </section>
  );
};

export default Container;
