import { FC } from "react";
import AlbumCard from "./AlbumCard/AlbumCard";

import { Artist, Record } from "../../../types/db";
import { filterParameters } from "../../Shop/Shop";
import { IalbumData } from "../../../types/shop";

import styles from "./AlbumsGrid.module.css";

interface IAlbumGridProps {
  recordsFiltered?: IalbumData;
  filter?: filterParameters;
  records?: Record[];
  artists?: Artist[];
  singleArtist?: Artist;
  isLoading?: boolean;
  loadingArray?: number[];
}

const AlbumsGrid: FC<IAlbumGridProps> = ({
  recordsFiltered,
  filter,
  records,
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
        {recordsFiltered[filter].albums.map((record) => {
          for (let i = 0; i < artists.length; i++) {
            if (artists[i].artist === record.artist) {
              return (
                <AlbumCard
                  key={record._id.toString()}
                  isLoading={isLoading}
                  album={record}
                  artist={artists[i]}
                />
              );
            }
          }
        })}
      </ul>
    );
  }
  if (singleArtist && records)
    return (
      <ul className={styles.albums}>
        {records.map((album) => (
          <AlbumCard
            key={album._id.toString()}
            album={album}
            artist={singleArtist}
          />
        ))}
      </ul>
    );

  if (records && artists)
    return (
      <ul className={styles.albums}>
        {records.map((record) => {
          for (let i = 0; i < artists.length; i++) {
            if (artists[i]!.artist === record.artist)
              return (
                <AlbumCard
                  key={record._id.toString()}
                  album={record}
                  artist={artists[i]!}
                />
              );
          }
        })}
      </ul>
    );
};

export default AlbumsGrid;
