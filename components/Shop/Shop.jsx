import { useEffect, useState } from "react";

import sendRequest from "../../helper/SendRequest";

import AlbumCard from "../UI/AlbumCard/AlbumCard";
import Container from "../UI/Container/Container";

import { poppins } from "@/pages/_app";

import styles from "./Shop.module.css";
import PageTitle from "../UI/PageTitle/PageTitle";
import Input from "../UI/Form/Input";
import Search from "../svg/Search";

const Shop = ({ initialData }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const [isLoading, setIsLoading] = useState(false);
  const [albumsData, setAlbumsData] = useState({
    All: initialData,
    Jazz: { countRecords: 0, albums: [] },
    HipHop: { countRecords: 0, albums: [] },
    "R&B": { countRecords: 0, albums: [] },
    Pop: { countRecords: 0, albums: [] },
    Classic: { countRecords: 0, albums: [] },
    Rock: { countRecords: 0, albums: [] },
    Electronic: { countRecords: 0, albums: [] },
  });

  const changeFilterHandler = (event) => {
    setActiveFilter(event.target.innerText);
  };

  useEffect(() => {
    const activeFilterHandler = async () => {
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

  return (
    <>
      <Container>
        <div className={`${poppins.variable} ${styles.header}`}>
          <PageTitle title="Discover"></PageTitle>
          <Input
            id="search"
            placeholder="Search for artist or album name"
            inputType="text"
          ></Input>
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
              ${activeFilter === genre ? styles.activeFilter : ""}`}
            >
              {genre}
            </li>
          ))}
        </ul>
      </Container>

      <Container>
        <p className={styles.counter}>
          Found vinyls {albumsData[activeFilter].countRecords}
        </p>

        <ul className={styles.albums}>
          {isLoading ? (
            <p style={{ color: "white" }}>loading</p> //!CHANGE TO SKELETONNNNN
          ) : (
            albumsData[activeFilter].albums.map((album) => (
              <li key={album._id}>
                <AlbumCard album={album} />
              </li>
            ))
          )}
        </ul>
      </Container>
    </>
  );
};

export default Shop;

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
