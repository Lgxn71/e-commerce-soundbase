import { useRecoilState } from "recoil";
import { cartState } from "../../../CartAtom/cartAtom";
import {
  decreaseCartItem,
  addItemToCart,
  removeCartItem,
  recalculateCartPricesAndQuanity,
} from "../../../cartUitls/cartUtils";

import Icons from "../../../../UI/Icons/Icons";

import styles from "./CartAlbumActions.module.css";

import { Album } from "../../../../../types/db";

const CartAlbumActions = ({ album }: { album: Album }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const updatedCart = addItemToCart(cart, album);
    const { cartQuantityCounter, cartTotalPrice } =
      recalculateCartPricesAndQuanity(updatedCart.cartItems);

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
      const { cartQuantityCounter, cartTotalPrice } =
        recalculateCartPricesAndQuanity(updatedCart.cartItems);

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
