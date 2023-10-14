import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

import CardWithHeader from "../Cards/CardHeader/CardWithHeader";

import Icons from "../Icons/Icons";

import { poppins } from "../../../src/pages/_app";

import styles from "./Popup.module.css";

const Popup = ({ title, onClose, body }) => {
  return createPortal(
    <>
      <Backdrop onClose={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        <CardWithHeader
          header={
            <>
              <h2 className={styles.title}>{title}</h2>
              <Icons.WhiteCross onClick={onClose} />
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
