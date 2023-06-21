import styles from "./AboutArtist.module.css";

const AboutArist = ({ artistDetails }) => {
  return (
    <>
      <h4 className={styles.title}>About Artist</h4>
      <p>{artistDetails.aboutArtist}</p>
      <ul className={styles.artistNumbers}>
        <li>
          <h5>Sold Vinyls</h5>
          <p className={styles.nums}>{artistDetails.soldVinyls}</p>
        </li>
        <li>
          <h5>Views</h5>
          <p className={styles.nums}>{artistDetails.views}</p>
        </li>
        <li>
          <h5>Featured</h5>
          <p className={styles.nums}>{artistDetails.featured}</p>
        </li>
      </ul>
    </>
  );
};

export default AboutArist;
