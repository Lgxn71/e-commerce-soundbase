import CardWithHeader from "../../../UI/Cards/CardHeader/CardWithHeader";
import Actions from "./Actions/Actions";

import styles from "./SingleAlbumCards.module.css";
const AlbumCards = ({ songs, price, Link, onAddToCart }) => {
  return (
    <div className={styles.cardContainer}>
      <CardWithHeader
        header={
          <>
            <p className={styles.songsTitle}>Songs</p>
            <p>Total: {songs.length}</p>
          </>
        }
        body={
          <ul className={styles.songsContainerBody}>
            {songs.map((song) => (
              <li key={song} className={styles.songParagraph}>
                {song}
              </li>
            ))}
          </ul>
        }
      />
      <CardWithHeader
        header={
          <>
            <h4 className={styles.priceTitle}>PRICE</h4>
            <p className={styles.price}>$ {price}</p>
          </>
        }
        body={
          <>
            <Actions Link={Link} onAddToCart={onAddToCart} />
          </>
        }
      />
    </div>
  );
};
export default AlbumCards;
