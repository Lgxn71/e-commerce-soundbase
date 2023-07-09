import { useState, useEffect } from "react";

import Link from "next/link";

import Button from "../Buttons/Button";
import ButtonEmptyBlack from "../Buttons/ButtonEmptyBlack";

import styles from "./Bill.module.css";

let shipping = 15;
const Bill = () => {
  const [cartLocal, setCartLocal] = useState({
    quantity: 0,
    sum: 0,
  });
  let cartLocalStorage;
  useEffect(() => {
    cartLocalStorage = JSON.parse(localStorage.getItem("cartData"));
    // 0 quantity 1 sum
    setCartLocal({
      quantity: cartLocalStorage[0],
      sum: cartLocalStorage[1],
    });
  }, []);

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
            <span className={styles.highlight}>{cartLocal.quantity}</span>
          </li>
          <li className={styles.list}>
            <span>Shipping</span>
            <span className={styles.highlight}>$ {shipping}</span>
          </li>
          <li className={styles.list}>
            <span>Price</span>
            <span className={styles.highlight}>$ {cartLocal.sum}</span>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <p className={styles.containerTotalPrice}>
          <span>Total Price</span>
          <span className={styles.totalPrice}>
            $ {cartLocal.sum + shipping}
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
