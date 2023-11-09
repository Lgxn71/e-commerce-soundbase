import { FC, memo } from "react";

import Link from "next/link";

import styles from "./AlbumCardDetails.module.css";

interface IAlbumCardDetailsProps {
  price: number;
  artistId: string;
  albumId: string;
  albumName: string;
  artistName: string;
}

const AlbumCardDetails: FC<IAlbumCardDetailsProps> = memo(
  function AlbumCardDetails({
    price,
    artistId,
    albumId,
    albumName,
    artistName,
  }) {
    return (
      <>
        <Link href={`/shop/${albumId}`}>
          <p className={styles.albumName}>{albumName}</p>
        </Link>

        <Link href={`/artist/${artistId}`} className={styles.artist}>
          Album by <span>{artistName}</span>
        </Link>

        <div className={styles.details}>
          <p className={styles.price}>PRICE</p>

          <div className={styles.badge}>
            <div className={styles.badgeBackground}>$ {price}</div>
          </div>
        </div>
      </>
    );
  }
);

export default AlbumCardDetails;
