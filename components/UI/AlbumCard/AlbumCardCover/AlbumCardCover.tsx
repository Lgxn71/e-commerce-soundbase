import { FC } from "react";

import Image from "next/image";

import styles from "./AlbumCardCover.module.css";

interface IAlbumCardCoverProps {
  imagePath: string;
  albumName: string;
  onAddToCart: () => void;
}

const AlbumCardCover: FC<IAlbumCardCoverProps> = ({
  imagePath,
  onAddToCart,
  albumName,
}) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        className={styles.image}
        src={imagePath}
        alt={`cover of ${albumName}`}
        width={280}
        height={280}
        quality={90}
      />

      <div onClick={onAddToCart} className={styles.addToCartButton}>
        + Add To Cart
      </div>
    </div>
  );
};
export default AlbumCardCover;
