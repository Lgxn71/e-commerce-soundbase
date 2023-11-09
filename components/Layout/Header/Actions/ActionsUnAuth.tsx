import Link from "next/link";

import Buttons from "../../../UI/Buttons/Buttons";

import styles from "./ActionsUnAuth.module.css";
const ActionUnauth = () => (
  <div className={styles.unAuthActions}>
    <Link href="/auth/sign-in">
      <Buttons.Violet>Get Started</Buttons.Violet>
    </Link>
    <Link href="/auth/sign-up">Sign Up</Link>
  </div>
);
export default ActionUnauth;
