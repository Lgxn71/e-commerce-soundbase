import { useEffect, useState } from "react";

import AlbumCard from "../UI/AlbumCard/AlbumCard";
import Container from "../UI/Container/Container";

import { poppins } from "@/pages/_app";

import styles from "./Shop.module.css";

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
        const response = await fetch("/api/filtered-albums", {
          method: "POST",
          body: JSON.stringify({ activeFilter: activeFilter }),
          "Content-Type": "application/json",
        });
        const filteredAlbumsData = await response.json();

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
          <h2>Discover</h2>
          <input></input>
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
            <p style={{ color: "white" }}>loading</p> // aidar will change
          ) : (
            albumsData[activeFilter].albums.map((album) => (
              <li key={album._id}>
                <AlbumCard
                  album={album}
                  artist={album.artist}
                  albumSrc={album.imagePath}
                  albumName={album.albumName}
                  id={album._id}
                  price={album.price}
                />
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
