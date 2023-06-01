import Container from "../../UI/Container/Container";

import AlbumCard from "../../UI/AlbumCard/AlbumCard";

import styles from "./AlbumList.module.css";

const AlbumList = ({ albums, title }) => {
  return (
    <Container isBorderThere={true}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.albums}>
        {albums.map((album) => (
          <AlbumCard
            id={album._id}
            key={album._id}
            albumName={album.albumName}
            artist={album.artist}
            albumSrc={album.imagePath}
            price={album.price}
          />
        ))}
      </div>
    </Container>
  );
};

export default AlbumList;
