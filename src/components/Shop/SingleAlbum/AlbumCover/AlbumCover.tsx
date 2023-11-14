import Image from "next/image";

import { Album } from "../../../../types/db";

import styles from "./AlbumCover.module.css";
import { FC } from "react";

interface AlbumCoverProps {
  albumDetails: Album;
}

const AlbumCover: FC<AlbumCoverProps> = ({ albumDetails }) => {
  const genres = albumDetails.genres.join(" ");

  return (
    <div className={styles.imageContainer}>
      <Image
        className={styles.image}
        width={630}
        height={700}
        alt={`Cover of ${albumDetails.albumName}`}
        src={albumDetails.imagePath}
        quality={100}
      />

      <div className={styles.overlay}>
        <span className={styles.genres}>{genres}</span>

        <span className={styles.date}>{albumDetails.releaseDate}</span>
      </div>
    </div>
  );
};

export default AlbumCover;
