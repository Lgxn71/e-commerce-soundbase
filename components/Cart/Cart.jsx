import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { useRecoilState } from "recoil";
import { cartState } from "./atoms/cartAtom";

import Link from "next/link";

import CartAlbum from "./CartAlbum/CartAlbum";
import Payment from "./Payment/Payment";
import PleaseSignInPopup from "./PleaseSignInPopup/PleaseSignInPopup";

import Container from "../UI/Container/Container";
import ButtonEmptyBlack from "../UI/Buttons/ButtonEmptyBlack";

import styles from "./Cart.module.css";

const Cart = () => {
  const session = useSession();

  const [cart, setCart] = useRecoilState(cartState);
  const [sumTemp, setSumTemp] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const arrayOfPrices = cart.cartItems.map(
      (item) => item.price * item.quantity
    );
    let sum = 0;
    for (let index = 0; index < arrayOfPrices.length; index++) {
      sum += arrayOfPrices[index];
    }
    setSumTemp(sum);
  });

  useEffect(() => {
    setCart((prevCart) => ({ ...prevCart, cartTotalPrice: sumTemp }));
  }, [sumTemp]);

  const modalOpenHandler = () => {
    setModalOpen(true);
  };
  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <PleaseSignInPopup onClose={modalCloseHandler} />}

      <Container>
        <h2 className={styles.title}>Cart</h2>
      </Container>

      <Container isBorderThere={true}>
        {cart.cartItems.length === 0 ? (
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
              {cart.cartItems.map((album) => (
                <CartAlbum key={album._id} album={album} />
              ))}
            </div>

            <Payment
              cart={cart}
              onSetCart={setCart}
              onModalOpen={modalOpenHandler}
              session={session}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
