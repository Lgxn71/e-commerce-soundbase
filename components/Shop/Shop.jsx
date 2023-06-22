import { useEffect, useState } from "react";

import AlbumCard from "../UI/AlbumCard/AlbumCard";
import Container from "../UI/Container/Container";

import { poppins } from "@/pages/_app";

import styles from "./Shop.module.css";

const Shop = ({ initialData }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const [albumsData, setAlbumsData] = useState(initialData);

  const [isLoading, setIsLoading] = useState(false);

  const activeFilterHandler = async (event) => {
    setActiveFilter(event.target.innerText);

    setIsLoading(true);
    try {
      const response = await fetch("/api/filtered-albums", {
        method: "POST",
        body: JSON.stringify({ activeFilter: event.target.innerText }),
        "Content-Type": "application/json",
      });
      const filteredAlbumsData = await response.json();
      setAlbumsData(filteredAlbumsData);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

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
              onClick={activeFilterHandler}
              className={`
              ${styles.genre}
              ${activeFilter === genre ? styles.activeFilter : ""}`}
            >
              {genre}
            </li>
          ))}
        </ul>
      </Container>

      <Container isBorderThere={false}>
        <p className={styles.counter}>Found vinyls {albumsData.countRecords}</p>

        <ul className={styles.albums}>
          {isLoading ? (
            <p style={{ color: "white" }}>loading</p> // aidar will change
          ) : (
            albumsData.albums.map((album) => (
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

// useEffect(() => {
//   const fetchDataOnce = async () => {
//     try {
//       const response = await fetch("/api/filtered-albums", {
//         method: "POST",
//         body: JSON.stringify({ activeFilter: "All" }),
//         "Content-Type": "application/json",
//       });
//       const allAlbumsData = await response.json();
//       setAlbumsData(allAlbumsData);
//     } catch (error) {
//       console.error("failed to fetch data:", error);
//     }
//   };

//   fetchDataOnce();
//   setIsLoading(false);
// }, []);
