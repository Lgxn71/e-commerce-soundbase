import Link from "next/link";
import Buttons from "../../UI/Buttons/Buttons";

import styles from "./CartEmpty.module.css";
const CartEmpty = () => (
  <div className={styles.cartEmpty}>
    <h3>You haven{"'"}t added anything...yet!</h3>
    <p>
      Once you do, it{"'"}ll show up here so you can complete your purchases.
    </p>

    <Link href="/shop">
      <Buttons.EmptyBlack>Discover Vinyls</Buttons.EmptyBlack>
    </Link>
  </div>
);
export default CartEmpty;
