import { useRecoilValue } from "recoil";
import { cartState, cartSumState } from "../../Cart/atoms/cartAtom";

import styles from "./Bill.module.css";
import Button from "../Buttons/Button";
import ButtonEmptyBlack from "../Buttons/ButtonEmptyBlack";
import Link from "next/link";

let shipping = 20;
const Bill = () => {
  const cart = useRecoilValue(cartState);
  const sumCart = useRecoilValue(cartSumState);

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
            <span className={styles.highlight}>{cart.length}</span>
          </li>
          <li className={styles.list}>
            <span>Shipping</span>
            <span className={styles.highlight}>$ {shipping}</span>
          </li>
          <li className={styles.list}>
            <span>Price</span>
            <span className={styles.highlight}>$ {sumCart}</span>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <p className={styles.containerTotalPrice}>
          <span>Total Price</span>
          <span className={styles.totalPrice}>$ {sumCart + shipping}</span>
        </p>

        <div className={styles.buttons}>
          {/* <Button>Visit Purchase History</Button> */}
          <Link href="/shop">
            <ButtonEmptyBlack>Discover</ButtonEmptyBlack>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bill;
