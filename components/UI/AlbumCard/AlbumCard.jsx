import { useRecoilState } from "recoil";

import { cartState } from "../../Cart/atoms/cartAtom";

import Link from "next/link";
import Image from "next/image";

import styles from "./AlbumCard.module.css";

const AlbumCard = ({ album }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const existingItem = cart.cartItems.find(
      (cartItem) => cartItem._id === album._id
    );

    if (existingItem) {
      const updatedItems = cart.cartItems.map((item) => {
        if (item._id === album._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart((prevState) => ({ ...prevState, cartItems: updatedItems }));
    } else {
      setCart((prevState) => ({
        ...prevState,
        cartItems: [...cart.cartItems, { ...album, quantity: 1 }],
      }));
    }
  };

  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={album.imagePath}
        alt={`cover of ${album.albumName}`}
        width={290}
        height={290}
        quality={100}
      />

      <Link href={`/shop/${album._id}`}>
        <h4>{album.albumName}</h4>
      </Link>

      <p className={styles.artist}>
        album by <span>{album.artist}</span>
      </p>
      <div className={styles.actions}>
        <p className={styles.price}>PRICE</p>
        <button onClick={addToCartHandler} className={styles.button}>
          <div className={styles.buttonBackGroundColor}>$ {album.price}</div>
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
