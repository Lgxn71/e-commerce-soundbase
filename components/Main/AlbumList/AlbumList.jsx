import Container from "../../UI/Container/Container";
import AlbumCard from "../../UI/AlbumCard/AlbumCard";

import styles from "./AlbumList.module.css";
import ContainerTitle from "../ContainerTitle/ContainerTitle";

const AlbumList = ({ albums, title, artists }) => {
  return (
    <Container isBorderThere={true}>
      <ContainerTitle title={title} />

      <div className={styles.albums}>
        {albums.map((album) => {
          let currentArtist = {};
          for (let i = 0; i < artists.length; i++) {
            if (artists[i].artist === album.artist) {
              currentArtist = { ...artists[i] };
              return (
                <AlbumCard
                  album={album}
                  artist={currentArtist}
                  key={album._id}
                />
              );
            }
          }
        })}
      </div>
    </Container>
  );
};

export default AlbumList;
