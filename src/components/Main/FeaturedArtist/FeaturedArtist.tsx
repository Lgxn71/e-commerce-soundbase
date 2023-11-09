import Link from "next/link";

import Image from "next/image";

import Container from "../../UI/Container/Container";
import ContainerTitle from "../ContainerTitle/ContainerTitle";

import styles from "./FeaturedArtist.module.css";
import { Artist, Record } from "../../../types/db";

import formatArtistNumber from "../../../helper/formatArtistNumbers";

const FeaturedArtist = ({
  featuredArtist,
}: {
  featuredArtist: { artist: Artist; album: Record };
}) => {
  const artist = { ...featuredArtist.artist };
  const album = { ...featuredArtist.album };

  const artistDetails = [
    { title: "Sold Vinyls", number: artist.soldVinyls },
    { title: "Views", number: artist.views },
    { title: "Featured", number: artist.featured },
  ];
  const artistsDetailsFormated = formatArtistNumber(artistDetails);

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
            <div>
              <h3>ARTIST OF THE MONTH</h3>

              <p className={styles.albumDescription}>{artist.aboutArtist}</p>

              <ul className={styles.numbers}>
                {artistsDetailsFormated.map((detail) => (
                  <li key={detail.title}>
                    <span className={styles.detailTitle}>{detail.title}</span>
                    <span className={styles.detailNumber}>
                      + {detail.number}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.links}>
              <Link href={`/shop/${album._id}`}>
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
      </div>
    </Container>
  );
};
export default FeaturedArtist;
