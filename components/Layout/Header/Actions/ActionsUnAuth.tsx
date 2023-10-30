import Link from "next/link";

import Buttons from "../../../UI/Buttons/Buttons";

import styles from "./ActionsUnAuth.module.css";
const ActionUnauth = () => (
  <div className={styles.unAuthActions}>
    <Link href="/auth/signin">
      <Buttons.Violet>Get Started</Buttons.Violet>
    </Link>
    <Link href="/auth/signup">Sign Up</Link>
  </div>
);
export default ActionUnauth;
