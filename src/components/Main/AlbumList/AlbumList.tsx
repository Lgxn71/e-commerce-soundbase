import { FC } from "react";

import ContainerTitle from "../ContainerTitle/ContainerTitle";

import Container from "../../UI/Container/Container";
import AlbumCard from "../../UI/AlbumsGrid/AlbumCard/AlbumCard";

import styles from "./AlbumList.module.css";

import { Record, Artist } from "../../../types/db";

interface IAlbumListProps {
  title: string;
  albums: Record[];
  artists: Artist[];
}

const AlbumList: FC<IAlbumListProps> = ({ albums, title, artists }) => {
  const albumsMap = albums.map((album) => {
    let currentArtist;

    for (let i = 0; i < artists.length; i++) {
      if (artists[i].artist === album.artist) {
        currentArtist = { ...artists[i] } as Artist;
        return (
          <AlbumCard
            album={album}
            artist={currentArtist}
            key={album._id.toString()}
          />
        );
      }
    }
  });

  return (
    <Container isBorderThere={true}>
      <ContainerTitle title={title} />

      <div className={styles.albums}>{albumsMap}</div>
    </Container>
  );
};

export default AlbumList;
