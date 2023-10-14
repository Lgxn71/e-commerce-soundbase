import Link from "next/link";

import ButtonViolet from "../../../UI/Buttons/ButtonViolet";

import styles from "./ActionsUnAuth.module.css";
const ActionUnauth = () => (
  <div className={styles.unAuthActions}>
    <Link href="/auth/signin">
      <ButtonViolet>Get Started</ButtonViolet>
    </Link>
    <Link href="/auth/signup">Sign Up</Link>
  </div>
);
export default ActionUnauth;
