import { FC, MouseEventHandler } from "react";

import type { filterParameters } from "../Shop";

import Container from "../../UI/Container/Container";

import styles from "./Genres.module.css";

interface IGenres {
  onChangeFilter: MouseEventHandler<HTMLLIElement>;
  activeFilter: filterParameters;
}
const Genres: FC<IGenres> = ({ activeFilter, onChangeFilter }) => {
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

  return (
    <Container isBorderThere={true}>
      <ul className={styles.genres}>
        {genres.map((genre) => (
          <li
            key={genre}
            onClick={onChangeFilter}
            className={`${styles.genre}
              ${activeFilter === genre && styles.activeFilter}`}
          >
            {genre}
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default Genres;
