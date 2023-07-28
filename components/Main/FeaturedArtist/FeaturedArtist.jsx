import Image from "next/image";

import Container from "../../UI/Container/Container";
import ContainerTitle from "../ContainerTitle/ContainerTitle";

import styles from "./FeaturedArtist.module.css";
import Link from "next/link";
const FeaturedArtist = ({ featuredArtist }) => {
  const artist = { ...featuredArtist.artist };
  const album = { ...featuredArtist.album };

  const artistDetails = [
    { title: "Sold Vinyls", num: artist.soldVinyls },
    { title: "Views", num: artist.views },
    { title: "Featured", num: artist.featured },
  ];

  const formattedArtistDetails = artistDetails.map((detail) => {
    detail.num.toString();
    const formattedNumber = detail.num.slice(0, 3) + "k";
    return (
      <li key={detail.title}>
        <span className={styles.detailTitle}>{detail.title}</span>
        <span className={styles.detailNumber}>+ {formattedNumber}</span>
      </li>
    );
  });

  return (
    <Container>
      <div className={styles.container}>
        <ContainerTitle title="Featured Artist" />

        <div className={styles.body}>
          <Image
            className={styles.image}
            src={"/images/albums/selected_ambient_works.png"}
            alt={`Cover of ${album.albumName}`}
            width={450}
            height={450}
            quality={100}
          />

          <div className={styles.details}>
            <h3>ARTIST OF THE MONTH</h3>
            <p className={styles.albumDescirptipn}>{artist.aboutArtist}</p>
            <ul>{formattedArtistDetails}</ul>
            <Link href={`/shop/${album._id}`}>
              {" "}
              <p className={`${styles.albumName} ${styles.highlight}`}>
                {album.albumName}
              </p>
            </Link>

            <Link href={`/artist/${artist._id}`}>
              <p className={styles.album}>
                Albym by{" "}
                <span className={styles.highlight}>{artist.artist}</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default FeaturedArtist;
