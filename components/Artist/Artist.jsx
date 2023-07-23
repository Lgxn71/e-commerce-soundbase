import Container from "../UI/Container/Container";
import Image from "next/image";

import styles from "./Artist.module.css";
import AlbumCard from "../UI/AlbumCard/AlbumCard";

const Artist = ({ artist, albums }) => {
  const artistDetails = [
    { title: "Albums", number: albums.length },
    { title: "Views", number: artist.views },
    { title: "Featured", number: artist.featured },
    { title: "Sold Vinyls", number: artist.soldVinyls },
  ];

  return (
    <>
      <Container>
        <div className={styles.aboutArtist}>
          <Image
            className={styles.artistImage}
            src={artist.imagePath}
            width={100}
            height={100}
            alt={`image of ${artist.artist}`}
          />
          <h3>{artist.artist}</h3>
          <h5>about artist</h5>
          <p>{artist.aboutArtist}</p>
        </div>
      </Container>

      <Container isBorderThere={true}>
        <ul className={styles.artistDetails}>
          {artistDetails.map((detail) => (
            <li className={styles.details} key={detail.title}>
              <p className={styles.detailsTitle}>{detail.title}</p>
              <p>{detail.number}</p>
            </li>
          ))}
        </ul>
      </Container>

      <Container>
        <div className={styles.body}>
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} artist={artist} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Artist;
