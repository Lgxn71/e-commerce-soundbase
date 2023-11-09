import { useRecoilState } from "recoil";
import { cartState } from "../../../CartAtom/cartAtom";
import {
  decreaseCartItem,
  addItemToCart,
  removeCartItem,
} from "../../../cartUitls/cartUtils";

import Icons from "../../../../UI/Icons/Icons";

import styles from "./CartAlbumActions.module.css";

import { Record } from "../../../../../src/types/db";

const CartAlbumActions = ({ album }: { album: Record }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const updatedCart = addItemToCart(cart, album);
    let cartQuantityCounter = 0;
    for (let i = 0; i < updatedCart.cartItems.length; i++) {
      cartQuantityCounter += updatedCart.cartItems[i].quantity!;
    }

    const arrayOfPrices = updatedCart.cartItems.map(
      (item) => item.price * item.quantity!
    );
    let cartTotalPrice = 0;
    for (let i = 0; i < arrayOfPrices.length; i++) {
      cartTotalPrice += arrayOfPrices[i];
    }

    const cartModified = {
      cartItems: updatedCart.cartItems,
      cartQuantityCounter,
      cartTotalPrice,
    };

    localStorage.setItem("cart", JSON.stringify(cartModified));

    setCart((prev) => cartModified);
  };

  const decreaseFromCartHandler = () => {
    const updatedCart = decreaseCartItem(cart, album);

    if (updatedCart) {
      let cartQuantityCounter = 0;
      for (let i = 0; i < updatedCart.cartItems.length; i++) {
        cartQuantityCounter += updatedCart.cartItems[i].quantity!;
      }

      const arrayOfPrices = updatedCart.cartItems.map(
        (item) => item.price * item.quantity!
      );
      let cartTotalPrice = 0;
      for (let i = 0; i < arrayOfPrices.length; i++) {
        cartTotalPrice += arrayOfPrices[i];
      }

      const cartModified = {
        cartItems: updatedCart.cartItems,
        cartQuantityCounter,
        cartTotalPrice,
      };

      localStorage.setItem("cart", JSON.stringify(cartModified));

      setCart((prev) => cartModified);
    }
  };

  const removeFromCart = () => {
    const updatedCart = removeCartItem(cart, album);
    if (updatedCart) {
      setCart((prev) => updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className={styles.bottom}>
      <div className={styles.actions}>
        <p>
          Quantity:
          <span className={styles.quantityCounter}> {album.quantity}</span>
        </p>
        <Icons.Minus onClick={decreaseFromCartHandler} />
        <Icons.Plus onClick={addToCartHandler} />
      </div>
      <p onClick={removeFromCart} className={styles.remove}>
        Remove
      </p>
    </div>
  );
};
export default CartAlbumActions;
