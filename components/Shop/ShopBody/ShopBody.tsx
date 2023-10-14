import { FC } from "react";

import { Artist, Record } from "../../../src/types/db";
import { IalbumData } from "../../../src/types/shop";
import { filterParameters } from "../Shop";

import AlbumCard from "../../UI/AlbumCard/AlbumCard";
import Container from "../../UI/Container/Container";

import styles from "./ShopBody.module.css";

interface ShopBodyProps {
  isLoading: boolean;
  filter: filterParameters;
  albums: IalbumData;
  artists: Artist[];
}

const ShopBody: FC<ShopBodyProps> = ({
  isLoading,
  albums,
  filter,
  artists,
}) => {
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

  if (isLoading) {
    return (
      <Container>
        <div className={`${styles.counterSkeleton} skeleton `} />

        <ul className={styles.albums}>
          {loadingArray.map((card) => (
            <li key={card}>
              <AlbumCard isLoading={isLoading} />
            </li>
          ))}
        </ul>
      </Container>
    );
  } else {
    return (
      <Container>
        <p className={styles.counter}>
          Found vinyls {albums[filter].recordsQuantity}
        </p>

        <ul className={styles.albums}>
          {albums[filter].albums.map((album) => {
            for (let i = 0; i < artists.length; i++) {
              if (artists[i].artist === album.artist) {
                return (
                  <li key={album._id.toString()}>
                    <AlbumCard
                      isLoading={isLoading}
                      album={album}
                      artist={artists[i]}
                    />
                  </li>
                );
              }
            }
          })}
        </ul>
      </Container>
    );
  }
};
export default ShopBody;
