import { FC, MouseEventHandler } from "react";

import Link from "next/link";

import Popup from "../../UI/Popup/Popup";
import Buttons from "../../UI/Buttons/Buttons";

import { inter } from "../../../pages/_app";

import styles from "./SignInPopup.module.css";

const SignInPopup = ({
  onClose,
}: {
  onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}) => {
  return (
    <Popup
      title="Sign In"
      body={
        <div className={styles.body}>
          <h3>Sign In to Proceed</h3>
          <p>Complete your payment securely by signing in to your account.</p>

          <div className={`${inter.variable}  ${styles.actions}`}>
            <Buttons.EmptyBlack onClick={onClose}>Cancel</Buttons.EmptyBlack>

            <Link href="/auth/sign-in">
              <Buttons.White>Sign In</Buttons.White>
            </Link>
          </div>
        </div>
      }
      onClose={onClose as MouseEventHandler<HTMLDivElement>}
    />
  );
};

export default SignInPopup;
