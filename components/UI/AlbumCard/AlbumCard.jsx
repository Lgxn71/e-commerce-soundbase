import Link from "next/link";

import Image from "next/image";

import styles from "./AlbumCard.module.css";
const AlbumCard = ({ albumSrc, albumName, price, artist, id }) => {
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
        <button className={styles.button}>
          <div className={styles.buttonBackGroundColor}>$ {price}</div>
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
