import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import Link from "next/link";

import Container from "../../UI/Container/Container";
import CardEmpty from "../../UI/Cards/CardEmpty/CartEmpty";
import PageTitle from "../../UI/PageTitle/PageTitle";
import Button from "../../UI/Buttons/Button";
import ButtonEmptyBlack from "../../UI/Buttons/ButtonEmptyBlack";

import styles from "./Bill.module.css";

let shipping = 15;

const Bill = () => {
  const [cartLocal, setCartLocal] = useState({
    quantity: 0,
    sum: 0,
  });
  const session = useSession();

  const router = useRouter();


  useEffect(() => {
    const cartLocalStorage: [number, number] = JSON.parse(
      localStorage.getItem("cartData") as string
    );
    console.log(cartLocalStorage);

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
    setTimeout(() => {
      router.push("/");
    }, 2500);

    return (
      <>
        <Container>
          <PageTitle title="Payment Success" />
        </Container>
        <p className={styles.notAuthParagraph}>
          You are not authentificated, redirecting to home page...
        </p>
      </>
    );
  }

  if (session.data !== null) {
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
              <Link href={`/user/${session.data?.user?.id}`}>
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
  }
};

export default Bill;
