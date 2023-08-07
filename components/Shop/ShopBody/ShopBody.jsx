import AlbumCard from "../../UI/AlbumCard/AlbumCard";

import styles from "./ShopBody.module.css";

const ShopBody = ({ Container, isLoading, albums, filter, artists }) => {
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Container>
      {isLoading ? (
        <div className={`${styles.counterSkeleton} skeleton `} />
      ) : (
        <p className={styles.counter}>
          Found vinyls {albums[filter].recordsQuantity}
        </p>
      )}

      <ul className={styles.albums}>
        {isLoading
          ? loadingArray.map((card) => (
              <li key={card}>
                <AlbumCard
                  isLoading={isLoading}
                  activeFilter={filter}
                  albumsData={albums}
                />
              </li>
            ))
          : albums[filter].albums.map((album) => {
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
  );
};
export default ShopBody;
