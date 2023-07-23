import { useRecoilState } from "recoil";

import { cartState } from "../../Cart/atoms/cartAtom";

import Link from "next/link";
import Image from "next/image";

import styles from "./AlbumCard.module.css";

const AlbumCard = ({ album, isLoading, artist }) => {
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

  if (isLoading) {
    return (
      <div className={styles.card}>
        <div className={`${styles.skeletonImage} skeleton`} />

        <div className={`${styles.skeletonTitle} skeleton`} />

        <div className={`${styles.skeletonText} skeleton`} />

        <div className={styles.actions}>
          <div className={`${styles.skeletonTextShorter} skeleton`} />
          <div className={`${styles.skeletonButton} skeleton`} />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={album.imagePath}
          alt={`cover of ${album.albumName}`}
          width={280}
          height={280}
          quality={100}
        />
        <div onClick={addToCartHandler} className={styles.addToCartButton}>
          + Add To Cart
        </div>
      </div>

      <Link href={`/shop/${album._id}`}>
        <h4>{album.albumName}</h4>
      </Link>

      <Link href={`/artist/${artist._id}`} className={styles.artist}>
        album by <span>{album.artist}</span>
      </Link>
      <div className={styles.actions}>
        <p className={styles.price}>PRICE</p>
        <div className={styles.button}>
          <div className={styles.buttonBackGroundColor}>$ {album.price}</div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
