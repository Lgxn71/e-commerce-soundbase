import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

import CardWithHeader from "../Cards/CardHeader/CardWithHeader";

import WhiteCross from "../../svg/WhiteCross";

import { poppins } from "../../../src/pages/_app";

import styles from "./Popup.module.css";

const Popup = ({ title, onClose, body }) => {
  return createPortal(
    <>
      <Backdrop onClose={onClose}></Backdrop>
      <div className={`${poppins.className} ${styles.modal}`}>
        <CardWithHeader
          header={
            <>
              <h2 className={styles.title}>{title}</h2>
              <WhiteCross onClick={onClose} />
            </>
          }
          body={body}
        />
      </div>
    </>,
    document.body
  );
};
export default Popup;
