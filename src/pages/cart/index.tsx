import { useState } from "react";

import { useRecoilValue } from "recoil";
import { cartState } from "../../../components/Cart/CartAtom/cartAtom";

import Link from "next/link";

import CartAlbum from "../../../components/Cart/CartAlbum/CartAlbum";
import PaymentDetails from "../../../components/Cart/PaymentDetails/PaymentDetails";
import SignInPopup from "../../../components/Cart/SignInPopup/SignInPopup";

import Container from "../../../components/UI/Container/Container";
import ButtonEmptyBlack from "../../../components/UI/Buttons/ButtonEmptyBlack";

import styles from "./Cart.module.css";

const CartPage = () => {
  const cart = useRecoilValue(cartState);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const modalOpenHandler = () => setModalOpen((prev) => true);

  const modalCloseHandler = () => setModalOpen((prev) => false);

  return (
    <>
      {isModalOpen && <SignInPopup onClose={modalCloseHandler} />}

      <Container>
        <h2 className={styles.title}>Cart</h2>
      </Container>

      <Container isBorderThere={true}>
        {cart.cartItems.length === 0 ? (
          <div className={styles.cartEmpty}>
            <h3>You haven{"'"}t added anything...yet!</h3>
            <p>
              Once you do, it{"'"}ll show up here so you can complete your
              purchases.
            </p>

            <Link className={styles.button} href="/shop">
              <ButtonEmptyBlack>Discover Vinyls</ButtonEmptyBlack>
            </Link>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <div className={styles.cart}>
              {cart.cartItems.map((album) => (
                <CartAlbum key={album._id.toString()} album={album} />
              ))}
            </div>

            <PaymentDetails cart={cart} onModalOpen={modalOpenHandler} />
          </div>
        )}
      </Container>
    </>
  );
};

export default CartPage;
