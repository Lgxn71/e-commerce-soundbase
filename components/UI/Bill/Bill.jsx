import { useEffect } from "react";

import Link from "next/link";

import CardEmpty from "../Cards/CardEmpty/CartEmpty";
import PageTitle from "../PageTitle/PageTitle";
import Button from "../Buttons/Button";
import ButtonEmptyBlack from "../Buttons/ButtonEmptyBlack";

import styles from "./Bill.module.css";
import Container from "../Container/Container";

let shipping = 15;
const Bill = ({ session, router, cartLocal, setCartLocal }) => {
  useEffect(() => {
    const cartLocalStorage = JSON.parse(localStorage.getItem("cartData"));
    if (cartLocalStorage && Array.isArray(cartLocalStorage)) {
      setCartLocal({
        quantity: cartLocalStorage[0],
        sum: cartLocalStorage[1],
      });
    }
  }, [setCartLocal]);

  if (session.status === "loading") {
    return (
      <>
        <Container isBorderThere={true}>
          <PageTitle isCenter={true} title="Loading Payment Details..." />
        </Container>
        <CardEmpty>
          <div className={styles.header}>
            <div className={`${styles.skeletonText}skeleton `} />
            <div className={`${styles.skeletonText} skeleton `} />
          </div>

          <div className={styles.body}>
            <ul>
              <div className={`${styles.skeletonText} skeleton `} />
              <div className={`${styles.skeletonText} skeleton `} />
              <div className={`${styles.skeletonText} skeleton `} />
            </ul>
          </div>

          <div className={styles.actions}>
            <div className={styles.containerTotalPrice}>
              <div className={`${styles.skeletonTextLarger} skeleton `} />
            </div>

            <div className={styles.buttons}>
              <div className={`${styles.skeletonTextLarger} skeleton `} />
              <div className={`${styles.skeletonTextLarger} skeleton `} />
            </div>
          </div>
        </CardEmpty>
      </>
    );
  }
  if (session.status === "unauthenticated") {
    <Container>
      <PageTitle title="Payment Success" />
    </Container>;

    router.push("/");
    return (
      <p className={styles.notAuthParagraph}>
        You are not authentificated, redirecting to home page...
      </p>
    );
  }

  return (
    <>
      <Container isBorderThere={true}>
        <PageTitle isCenter={true} title="Payment Success" />
      </Container>

      <CardEmpty>
        <div className={styles.header}>
          <h4>Congratulations!</h4>
          <p>
            Your payment was successful. Visit purchase history if you would
            like to view.
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
            <Link href={`/user/${session.data.user.id}`}>
              <Button>Visit Purchase History</Button>
            </Link>

            <Link href="/shop">
              <ButtonEmptyBlack>Discover</ButtonEmptyBlack>
            </Link>
          </div>
        </div>
      </CardEmpty>
    </>
  );
};

export default Bill;
