import { FC } from "react";
import AlbumCard from "./AlbumCard/AlbumCard";

import { Artist, Album } from "../../../types/db";
import { filterParameters } from "../../Shop/Shop";
import { IalbumData } from "../../../types/shop";

import styles from "./AlbumsGrid.module.css";

interface IAlbumGridProps {
  recordsFiltered?: IalbumData;
  filter?: filterParameters;
  albums?: Album[];
  artists?: Artist[];
  singleArtist?: Artist;
  isLoading?: boolean;
  loadingArray?: number[];
}

const AlbumsGrid: FC<IAlbumGridProps> = ({
  recordsFiltered,
  filter,
  albums,
  artists,
  singleArtist,
  isLoading,
  loadingArray,
}) => {
  if (isLoading && loadingArray)
    return (
      <ul className={styles.albums}>
        {loadingArray.map((card) => (
          <AlbumCard key={card} isLoading={isLoading} />
        ))}
      </ul>
    );

  if (filter && recordsFiltered && artists) {
    return (
      <ul className={styles.albums}>
        {recordsFiltered[filter].albums.map((album) => {
          for (let i = 0; i < artists.length; i++) {
            if (artists[i].artist === album.artist) {
              return (
                <AlbumCard
                  key={album._id.toString()}
                  isLoading={isLoading}
                  album={album}
                  artist={artists[i]}
                />
              );
            }
          }
        })}
      </ul>
    );
  }
  if (singleArtist && albums)
    return (
      <ul className={styles.albums}>
        {albums.map((album) => (
          <AlbumCard
            key={album._id.toString()}
            album={album}
            artist={singleArtist}
          />
        ))}
      </ul>
    );

  if (albums && artists)
    return (
      <ul className={styles.albums}>
        {albums.map((album) => {
          for (let i = 0; i < artists.length; i++) {
            if (artists[i]!.artist === album.artist)
              return (
                <AlbumCard
                  key={album._id.toString()}
                  album={album}
                  artist={artists[i]!}
                />
              );
          }
        })}
      </ul>
    );
};

export default AlbumsGrid;
