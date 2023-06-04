import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useRecoilValue, useRecoilState } from "recoil";
import { cartState, cartSumState } from "./atoms/cartAtom";

import Link from "next/link";

import CartAlbum from "./CartAlbum/CartAlbum";
import PleaseSignInPopup from "./PleaseSignInPopup/PleaseSignInPopup";

import Button from "../UI/Buttons/Button";
import Container from "../UI/Container/Container";
import ButtonEmptyBlack from "../UI/Buttons/ButtonEmptyBlack";

import styles from "./Cart.module.css";

const shipping = 15;

const Cart = () => {
  const session = useSession();

  const router = useRouter();

  const cartItems = useRecoilValue(cartState);
  const [cartSum, setCartSum] = useRecoilState(cartSumState);
  const [isModalOpen, setModalOpen] = useState(false);

  const arrayOfPrices = cartItems.map((item) => item.price * item.quantity);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < arrayOfPrices.length; index++) {
      sum += arrayOfPrices[index];
    }
    setCartSum(sum);
  }, [arrayOfPrices]);

  const modalOpenHandler = () => {
    setModalOpen(true);
  };
  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const successHandler = () => {
    router.push("/payment/success");
  };

  return (
    <>
      {isModalOpen &&
        createPortal(
          <PleaseSignInPopup onClose={modalCloseHandler} />,
          document.body
        )}

      <Container>
        <h2 className={styles.title}>Cart</h2>
      </Container>

      <Container isBorderThere={true}>
        {cartItems.length === 0 ? (
          <div className={styles.cartEmpty}>
            <h3>You haven't added anything...yet!</h3>
            <p>
              Once you do, it'll show up here so you can complete your
              purchases.
            </p>

            <Link className={styles.button} href="/shop">
              <ButtonEmptyBlack>Discover Vinyls</ButtonEmptyBlack>
            </Link>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <div className={styles.cart}>
              {cartItems.map((album) => (
                <CartAlbum key={album._id} album={album} />
              ))}
            </div>

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
                    <span className={styles.price}> $ {cartSum}</span>
                  </li>
                </ul>
              </div>

              <div className={styles.actions}>
                <p className={styles.totalPrice}>
                  <span>Total Price:</span>
                  <span className={styles.totalPriceHigh}>
                    $ {cartSum + shipping}
                  </span>
                </p>
                <Button
                  onClick={
                    session.status === "unauthenticated"
                      ? modalOpenHandler
                      : successHandler
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
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
