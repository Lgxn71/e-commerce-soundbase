import { useRouter } from "next/router";

import Button from "../../UI/Buttons/Button";

import styles from "./Payment.module.css";

const shipping = 15;

const Payment = ({ cart, onModalOpen, onSetCart, session }) => {
  const router = useRouter();

  const successPurchaseHandler = () => {
    // onSetCart({ cartTotalPrice: 0, cartItems: [] });
    router.push("/payment/success");
  };

  return (
    <div className={styles.payment}>
      <div className={styles.pricingContainer}>
        <ul className={styles.list}>
          <li>
            <span>Quantity:</span>
            <span className={styles.price}>{cart.cartItems.length}</span>
          </li>
          <li>
            <span>Shipping:</span>
            <span className={styles.price}>$ {shipping}</span>
          </li>
          <li>
            <span>Price:</span>
            <span className={styles.price}> $ {cart.cartTotalPrice}</span>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <p className={styles.totalPrice}>
          <span>Total Price:</span>
          <span className={styles.totalPriceHigh}>
            $ {cart.cartTotalPrice + shipping}
          </span>
        </p>
        <Button
          onClick={
            session.status === "unauthenticated"
              ? onModalOpen
              : successPurchaseHandler
          }
        >
          Purchase
        </Button>

        {session.status === "unauthenticated" ? (
          <p className={styles.authentificate}>
            Please sign in to proceed with the payment
          </p>
        ) : undefined}
      </div>
    </div>
  );
};

export default Payment;
