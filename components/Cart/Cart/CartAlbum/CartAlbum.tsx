import Image from "next/image";
import Link from "next/link";

import CartAlbumActions from "./CartAlbumActions/CartAlbumActions";
import styles from "./CartAlbum.module.css";

import { Record } from "../../../../src/types/db";

const CartAlbum = ({ album }: { album: Record }) => {
  return (
    <div className={styles.albumContainer}>
      <Image
        src={album.imagePath}
        width={100}
        height={100}
        quality={95}
        alt={`album cover of ${album.albumName}`}
        className={styles.albumImage}
      />

      <div className={styles.albumData}>
        <div className={styles.header}>
          <Link href={`/shop/${album._id}`}>{album.albumName}</Link>
          <p>$ {album.price * album.quantity!}</p>
        </div>

        <p className={styles.artist}>
          Album by <span>{album.artist}</span>
        </p>

        <CartAlbumActions album={album} />
      </div>
    </div>
  );
};

export default CartAlbum;
