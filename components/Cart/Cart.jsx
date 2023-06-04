import { atom, useRecoilValue } from "recoil";

import { cartState } from "../../atoms/cartAtom";

import Link from "next/link";

import CartAlbum from "./CartAlbum/CartAlbum";

import Container from "../UI/Container/Container";
import ButtonEmptyBlack from "../UI/Buttons/ButtonEmptyBlack";

import styles from "./Cart.module.css";

const Cart = () => {
  const cartItems = useRecoilValue(cartState);
  console.log(cartItems);

  return (
    <>
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
            <div></div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
