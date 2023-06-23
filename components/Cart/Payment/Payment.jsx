import Button from "../../UI/Buttons/Button";

import styles from "./Payment.module.css";

const shipping = 15;

const Payment = ({
  cartSummaryPrice,
  onModalOpen,
  onSuccessPurchase,
  session,
}) => {
  return (
    <div className={styles.payment}>
      <div className={styles.pricingContainer}>
        <ul className={styles.list}>
          <li>
            <span>Quantity:</span>
            <span className={styles.price}>{cartItems.length}</span>
          </li>
          <li>
            <span>Shipping:</span>
            <span className={styles.price}>$ {shipping}</span>
          </li>
          <li>
            <span>Price:</span>
            <span className={styles.price}> $ {cartSummaryPrice}</span>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <p className={styles.totalPrice}>
          <span>Total Price:</span>
          <span className={styles.totalPriceHigh}>
            $ {cartSummaryPrice + shipping}
          </span>
        </p>
        <Button
          onClick={
            session.status === "unauthenticated"
              ? onModalOpen
              : onSuccessPurchase
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
