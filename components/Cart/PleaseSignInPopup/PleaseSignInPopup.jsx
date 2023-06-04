import Backdrop from "../../UI/Backdrop/Backdrop";

import WhiteCross from "../../svg/WhiteCross";

import { poppins, inter } from "@/pages/_app";

import styles from "./PleaseSignInPopup.module.css";
import ButtonEmptyBlack from "../../UI/Buttons/ButtonEmptyBlack";
import Button from "../../UI/Buttons/Button";
import Link from "next/link";

const PleaseSignInPopup = ({ children, onClose }) => {
  return (
    <>
      <Backdrop onClose={onClose}></Backdrop>
      <div className={`${poppins.variable} ${styles.modal}`}>
        <div className={styles.header}>
          <h2>Sign In</h2>
          <WhiteCross onClick={onClose} />
        </div>
        <div className={styles.body}>
          <h3>Sign In to Proceed</h3>
          <p>Complete your payment securely by signing in to your account.</p>

          <div className={`${inter.variable}  ${styles.actions}`}>
            <ButtonEmptyBlack onClick={onClose}>Cancel</ButtonEmptyBlack>

            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PleaseSignInPopup;
