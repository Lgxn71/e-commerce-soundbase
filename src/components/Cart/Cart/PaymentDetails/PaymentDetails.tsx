import { FC, MouseEventHandler } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ICart } from "../../CartAtom/cartAtom";
import Buttons from "../../../UI/Buttons/Buttons";

import { sendRequest } from "../../../../helper/util";

import styles from "./PaymentDetails.module.css";
import { z } from "zod";
interface IPaymentProps {
  cart: ICart;
  onPopupOpen: MouseEventHandler<HTMLButtonElement>;
}

const shipping = 15;

const PaymentDetails: FC<IPaymentProps> = ({ cart, onPopupOpen }) => {
  const router = useRouter();
  const session = useSession();

  const successPurchaseHandler = async () => {
    const cartLocalStorage = {
      cartQuantityCounter: cart.cartQuantityCounter,
      cartTotalPrice: cart.cartTotalPrice,
    };
    localStorage.setItem("cartDataBill", JSON.stringify(cartLocalStorage));

    let stripeCheckourSessionUrl;
    let response;
    if (session.data) {
      const [checkoutSessionUrl, res] = (await sendRequest(
        "/api/payment/checkout_session",
        "POST",
        {
          cart: cart.cartItems,
          email: session.data.user.email,
          id: session.data.user.id,
        }
      )) as [{ url: string }, Response];
      const urlParsed = z.string().url().safeParse(checkoutSessionUrl);
      if (!urlParsed.success) {
        console.log("Something went wrong");
        return;
      }
      stripeCheckourSessionUrl = checkoutSessionUrl.url;
      response = res;
    }

    if (!response?.ok) {
      console.log("Something went wrong");
      return;
    }
    localStorage.setItem(
      "cart",
      JSON.stringify({
        cartItems: [],
        cartQuantityCounter: 0,
        cartTotalPrice: 0,
      })
    );

    if (stripeCheckourSessionUrl) router.push(stripeCheckourSessionUrl);
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

        <Buttons.White
          onClick={
            session.status === "unauthenticated"
              ? onPopupOpen
              : successPurchaseHandler
          }
        >
          Purchase
        </Buttons.White>

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
