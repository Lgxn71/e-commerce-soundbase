import Image from "next/image";

import styles from "./AlbumCover.module.css";

const AlbumCover = ({ albumDetails }) => {
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
