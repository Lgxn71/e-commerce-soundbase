import { useEffect, useState } from "react";

import sendRequest from "../../helper/SendRequest";

import AlbumCard from "../UI/AlbumCard/AlbumCard";
import Container from "../UI/Container/Container";
import PageTitle from "../UI/PageTitle/PageTitle";
import Input from "../UI/Form/Input";

import { poppins } from "../../src/pages/_app";
import styles from "./Shop.module.css";

import Search from "../svg/Search";

const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];
const genres = [
  "All",
  "Jazz",
  "HipHop",
  "R&B",
  "Pop",
  "Classic",
  "Rock",
  "Electronic",
];

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
        const [filteredAlbumsData] = await sendRequest(
          "/api/filtered-albums",
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
      <Container>
        <div className={`${poppins.variable} ${styles.header}`}>
          <PageTitle title="Discover" />
          <Input
            id="search"
            placeholder="Search for artist or album name"
            inputType="text"
          />
          {/* //! MAYBE REFACTOR TO SEPARATE COMPNONENT CHECK WITH FOOTER */}
        </div>
      </Container>

      <Container isBorderThere={true}>
        <ul className={styles.genres}>
          {genres.map((genre) => (
            <li
              key={genre}
              onClick={changeFilterHandler}
              className={`${styles.genre}
              ${activeFilter === genre && styles.activeFilter}`}
            >
              {genre}
            </li>
          ))}
        </ul>
      </Container>

      <Container>
        {isLoading ? (
          <div className={`${styles.counterSkeleton} skeleton `} />
        ) : (
          <p className={styles.counter}>
            Found vinyls {albumsData[activeFilter].recordsQuantity}
          </p>
        )}

        <ul className={styles.albums}>
          {isLoading
            ? loadingArray.map((card) => (
                <li key={card}>
                  <AlbumCard
                    isLoading={isLoading}
                    activeFilter={activeFilter}
                    albumsData={albumsData}
                  />
                </li>
              ))
            : albumsData[activeFilter].albums.map((album) => {
                for (let i = 0; i < artists.length; i++) {
                  if (artists[i].artist === album.artist) {
                    return (
                      <li key={album._id}>
                        <AlbumCard album={album} artist={artists[i]} />
                      </li>
                    );
                  }
                }
              })}
        </ul>
      </Container>
    </>
  );
};

export default Shop;
