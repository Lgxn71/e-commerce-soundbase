import { useRecoilValue } from "recoil";

import { cartState } from "../../Cart/atoms/cartAtom";

import Link from "next/link";

import Button from "../Buttons/Button";
import ButtonEmptyBlack from "../Buttons/ButtonEmptyBlack";

import styles from "./Bill.module.css";

let shipping = 15;
const Bill = () => {
  const cart = useRecoilValue(cartState);

  return (
    <div className={styles.bill}>
      <div className={styles.header}>
        <h4>Congratulations!</h4>
        <p>
          Your payment was successful. Visit purchase history if you would like
          to view.
        </p>
      </div>

      <div className={styles.body}>
        <ul>
          <li className={styles.list}>
            <span>Quantity</span>
            <span className={styles.highlight}>{cart.cartItems.length}</span>
          </li>
          <li className={styles.list}>
            <span>Shipping</span>
            <span className={styles.highlight}>$ {shipping}</span>
          </li>
          <li className={styles.list}>
            <span>Price</span>
            <span className={styles.highlight}>$ {cart.cartTotalPrice}</span>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <p className={styles.containerTotalPrice}>
          <span>Total Price</span>
          <span className={styles.totalPrice}>
            $ {cart.cartTotalPrice + shipping}
          </span>
        </p>

        <div className={styles.buttons}>
          <Button>Visit Purchase History</Button>
          <Link href="/shop">
            <ButtonEmptyBlack>Discover</ButtonEmptyBlack>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bill;
