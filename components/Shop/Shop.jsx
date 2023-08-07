import { useEffect, useState } from "react";

import ShopHeader from "./ShopHeader/ShopHeader";
import Genres from "./Genres/Genres";
import ShopBody from "./ShopBody/ShopBody";

import sendRequest from "../../helper/SendRequest";

import Container from "../UI/Container/Container";

const Shop = ({ recordsQuantity, albums, artists }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const [isLoading, setIsLoading] = useState(false);

  const [albumsData, setAlbumsData] = useState({
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
      if (albumsData[activeFilter].albums.length !== 0) {
        return;
      }

      if (albumsData[activeFilter].albums.length === 0) {
        setIsLoading(true);
      }

      try {
        const [filteredAlbumsData, res] = await sendRequest(
          "/api/filter-albums",
          "POST",
          { activeFilter: activeFilter }
        );

        setAlbumsData(
          Object.assign({}, albumsData, {
            [activeFilter]: filteredAlbumsData,
          })
        );
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    activeFilterHandler();
  }, [activeFilter]);

  const changeFilterHandler = (event) => {
    setActiveFilter(event.target.innerText);
  };

  return (
    <>
      <ShopHeader Container={Container} />

      <Genres
        Container={Container}
        activeFilter={activeFilter}
        onChangeFilter={changeFilterHandler}
      />

      <ShopBody
        Container={Container}
        isLoading={isLoading}
        albums={albumsData}
        filter={activeFilter}
        artists={artists}
      />
    </>
  );
};

export default Shop;
