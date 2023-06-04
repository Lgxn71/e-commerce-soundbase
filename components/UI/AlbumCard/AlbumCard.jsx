import { useRecoilState } from "recoil";

import { cartState } from "../../../atoms/cartAtom";

import Link from "next/link";

import Image from "next/image";

import styles from "./AlbumCard.module.css";

const AlbumCard = ({ albumSrc, albumName, price, artist, id, album }) => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === album._id
    );
    console.log(existingItem);

    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item._id === album._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCartItems([...updatedItems]);
    } else {
      setCartItems([...cartItems, { ...album, quantity: 1 }]);
    }
  };

  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={albumSrc}
        alt={`cover of ${albumName}`}
        width={280}
        height={280}
        quality={85}
      />

      <Link href={`/shop/${id}`}>
        <h4>{albumName}</h4>
      </Link>

      <p className={styles.artist}>
        album by <span>{artist}</span>
      </p>
      <div className={styles.actions}>
        <p className={styles.price}>PRICE</p>
        <button onClick={addToCartHandler} className={styles.button}>
          <div className={styles.buttonBackGroundColor}>$ {price}</div>
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
