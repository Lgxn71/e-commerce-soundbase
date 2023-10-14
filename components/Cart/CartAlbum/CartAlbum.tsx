import { FC } from "react";

import { useRecoilState } from "recoil";
import { cartState } from "../CartAtom/cartAtom";
import { decreaseCartItem } from "../cartUitls/cartUtils";

import Image from "next/image";
import Link from "next/link";

import styles from "./CartAlbum.module.css";

import { Record } from "../../../src/types/db";

interface IAlbumProps {
  album: Record;
}

const CartAlbum: FC<IAlbumProps> = ({ album }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const removeFromCartHandler = () => {
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

      setCart(cartModified);
    }
  };

  return (
    <div className={styles.albumContainer}>
      <Image
        src={album.imagePath}
        width={100}
        height={100}
        quality={100}
        alt={`album cover of ${album.albumName}`}
      />

      <div className={styles.albumData}>
        <div className={styles.header}>
          <Link href={`/shop/${album._id}`}>{album.albumName}</Link>
          <p>$ {album.price * album.quantity!}</p>
        </div>

        <p className={styles.artist}>
          Album by <span>{album.artist}</span>
        </p>

        <div className={styles.bottom}>
          <p>Quantity: {album.quantity} </p>
          <p onClick={removeFromCartHandler} className={styles.remove}>
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartAlbum;
