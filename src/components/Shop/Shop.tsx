import { useEffect, useState, MouseEventHandler, FC } from "react";

import type { IalbumData, IalbumDataFiltered } from "../../types/shop";
import { ShopPageProps } from "../../pages/shop";

import ShopHeader from "./ShopHeader/ShopHeader";
import Genres from "./Genres/Genres";
import ShopBody from "./ShopBody/ShopBody";

import sendRequest from "../../helper/SendRequest";

export enum filterParameters {
  All = "All",
  Jazz = "Jazz",
  HipHop = "HipHop",
  "R&B" = "R&B",
  Pop = "Pop",
  Classic = "Classic",
  Rock = "Rock",
  Electronic = "Electronic",
}

const Shop: FC<ShopPageProps> = ({ recordsQuantity, albums, artists }) => {
  const [activeFilter, setActiveFilter] = useState<filterParameters>(
    filterParameters.All
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [albumsData, setAlbumsData] = useState<IalbumData>({
    All: { recordsQuantity: recordsQuantity, albums: albums },
    Jazz: { recordsQuantity: 0, albums: [] },
    HipHop: { recordsQuantity: 0, albums: [] },
    "R&B": { recordsQuantity: 0, albums: [] },
    Pop: { recordsQuantity: 0, albums: [] },
    Classic: { recordsQuantity: 0, albums: [] },
    Rock: { recordsQuantity: 0, albums: [] },
    Electronic: { recordsQuantity: 0, albums: [] },
  });

  useEffect(() => {
    const activeFilterHandler = async () => {
      if (albumsData[activeFilter].albums.length !== 0) return;

      if (albumsData[activeFilter].albums.length === 0)
        setIsLoading((prev) => true);

      try {
        const [filteredAlbumsData] = (await sendRequest(
          "/api/filter-albums",
          "POST",
          { activeFilter: activeFilter }
        )) as [IalbumDataFiltered];

        setAlbumsData(
          Object.assign({}, albumsData, {
            [activeFilter]: filteredAlbumsData,
          })
        );
      } catch (error) {
        console.log(error);
      }

      setIsLoading((prev) => false);
    };

    activeFilterHandler();
  }, [activeFilter]);

  const changeFilterHandler: MouseEventHandler<HTMLLIElement> = (event) => {
    const target = event.target as HTMLElement;
    if (target) setActiveFilter((prev) => target.innerText as filterParameters);
  };

  return (
    <>
      <ShopHeader />

      <Genres
        activeFilter={activeFilter}
        onChangeFilter={changeFilterHandler}
      />

      <ShopBody
        isLoading={isLoading}
        albums={albumsData}
        filter={activeFilter}
        artists={artists}
      />
    </>
  );
};

export default Shop;
