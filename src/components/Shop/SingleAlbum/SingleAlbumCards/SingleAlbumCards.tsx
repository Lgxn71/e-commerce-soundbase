import { FC, MouseEventHandler } from "react";

import Cards from "../../../UI/Cards/Cards";
import Actions from "./Actions/Actions";

import styles from "./SingleAlbumCards.module.css";

interface ISingleAlbumCardsProps {
  songs: string[];
  price: number;
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
}

const SingleAlbumCards: FC<ISingleAlbumCardsProps> = ({
  songs,
  price,
  onAddToCart,
}) => {
  return (
    <div className={styles.cardContainer}>
      <Cards.WithHeader
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

      <Cards.WithHeader
        header={
          <>
            <h4 className={styles.priceTitle}>PRICE</h4>
            <p className={styles.price}>$ {price}</p>
          </>
        }
        body={<Actions onAddToCart={onAddToCart} />}
      />
    </div>
  );
};
export default SingleAlbumCards;
