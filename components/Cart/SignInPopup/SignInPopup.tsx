import { FC, MouseEventHandler } from "react";

import Link from "next/link";

import Popup from "../../UI/Popup/Popup";
import ButtonEmptyBlack from "../../UI/Buttons/ButtonEmptyBlack";
import Button from "../../UI/Buttons/Button";

import { inter } from "../../../src/pages/_app";

import styles from "./SignInPopup.module.css";

interface ISingInPopupProps {
  onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const SignInPopup: FC<ISingInPopupProps> = ({ onClose }) => {
  return (
    <Popup
      title="Sign In"
      body={
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
      }
      onClose={onClose as MouseEventHandler<HTMLDivElement>}
    />
  );
};

export default SignInPopup;
