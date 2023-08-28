import { useRecoilState } from "recoil";
import { cartState } from "../CartAtom/cartAtom";
import { decreaseCartItem } from "../cartUitls/cartUtils";

import Image from "next/image";
import Link from "next/link";

import styles from "./CartAlbum.module.css";

const CartAlbum = ({ album }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const removeFromCartHandler = () => {
    const updatedCart = decreaseCartItem(cart, album);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
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
