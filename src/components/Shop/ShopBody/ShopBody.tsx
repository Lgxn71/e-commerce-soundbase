import { FC } from "react";

import { Artist } from "../../../types/db";
import { IalbumData } from "../../../types/shop";
import { filterParameters } from "../Shop";

import Container from "../../UI/Container/Container";

import styles from "./ShopBody.module.css";
import AlbumsGrid from "../../UI/AlbumsGrid/AlbumsGrid";

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

  if (isLoading)
    return (
      <Container>
        <div className={`${styles.counterSkeleton} skeleton `} />

        <AlbumsGrid isLoading={isLoading} loadingArray={loadingArray} />
      </Container>
    );
  else
    return (
      <Container>
        <p className={styles.counter}>
          Found vinyls {albums[filter].recordsQuantity}
        </p>

        <AlbumsGrid
          recordsFiltered={albums}
          filter={filter}
          artists={artists}
        />
      </Container>
    );
};
export default ShopBody;
