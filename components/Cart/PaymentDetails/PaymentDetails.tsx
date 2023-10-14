import { FC, MouseEventHandler } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ICart } from "../CartAtom/cartAtom";

import Button from "../../UI/Buttons/Button";

import styles from "./PaymentDetails.module.css";
import sendRequest from "../../../helper/SendRequest";

interface IPaymentProps {
  cart: ICart;
  onModalOpen: MouseEventHandler<HTMLButtonElement>;
}

const shipping = 15;

const PaymentDetails: FC<IPaymentProps> = ({ cart, onModalOpen }) => {
  const router = useRouter();
  const session = useSession();

  const successPurchaseHandler = async () => {
    const cartLocalStorage = [cart.cartItems.length, cart.cartTotalPrice];
    localStorage.setItem("cartData", JSON.stringify(cartLocalStorage));

    let paymentData;
    let response;
    if (session.data) {
      const [data, res] = (await sendRequest(
        "/api/payment/checkout_session",
        "POST",
        {
          cart: cart.cartItems,
          email: session.data.user.email,
          id: session.data.user.id,
        }
      )) as [{ url: string }, Response];
      paymentData = data;
      response = res;
    }

    console.log(paymentData);

    if (!response?.ok) {
      console.log("Something went wrong");
      return;
    }

    if (paymentData?.url) router.push(paymentData.url);
  };

  return (
    <div className={styles.payment}>
      <div className={styles.pricingContainer}>
        <ul className={styles.list}>
          <li>
            <span>Quantity:</span>
            <span className={styles.price}>{cart.cartQuantityCounter}</span>
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

        {session.status === "unauthenticated" && (
          <p className={styles.authentificate}>
            Please sign in to proceed with the payment
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
