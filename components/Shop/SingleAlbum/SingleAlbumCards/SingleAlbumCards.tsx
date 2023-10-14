import { FC, MouseEventHandler } from "react";

import Link from "next/link";

import CardWithHeader from "../../../UI/Cards/CardHeader/CardWithHeader";
import Actions from "./Actions/Actions";

import styles from "./SingleAlbumCards.module.css";

interface IAlbumCardsProps {
  songs: string[];
  price: number;
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
}

const AlbumCards: FC<IAlbumCardsProps> = ({ songs, price, onAddToCart }) => {
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
            <Actions onAddToCart={onAddToCart} />
          </>
        }
      />
    </div>
  );
};
export default AlbumCards;