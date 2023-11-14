import { formatArtistNumber } from "../../../../helper/util";

import { Artist } from "../../../../types/db";

import styles from "./AboutArtist.module.css";

const AboutArist = ({ artistDetails }: { artistDetails: Artist }) => {
  const artistData = [
    { title: "Sold Vinyls", number: artistDetails.soldVinyls },
    { title: "Views", number: artistDetails.views },
    { title: "Featured", number: artistDetails.featured },
  ];
  const artistDataFormated = formatArtistNumber(artistData);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>About Artist</h4>

      <p>{artistDetails.aboutArtist}</p>

      <ul className={styles.artistNumbers}>
        {artistDataFormated.map((data) => (
          <li key={data.title}>
            <h5>{data.title}</h5>
            <p className={styles.nums}>+ {data.number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutArist;
