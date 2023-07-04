import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartAtom";

import Image from "next/image";
import Link from "next/link";

import styles from "./CartAlbum.module.css";

const CartAlbum = ({ album }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const removeFromCartHandler = () => {
    const existingItem = cart.cartItems.find((item) => item._id === album._id);

    if (existingItem.quantity === 1) {
      const updatedItems = cart.cartItems.filter(
        (item) => item._id !== album._id
      );
      setCart({ ...cart, cartItems: [...updatedItems] });
    } else {
      const updatedItems = cart.cartItems.map((item) =>
        item._id === album._id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart({ ...cart, cartItems: [...updatedItems] });
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
          <p>$ {album.price * album.quantity}</p>
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
