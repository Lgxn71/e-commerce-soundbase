import styles from "./AboutArtist.module.css";

const AboutArist = ({ artistDetails }) => {
  const artistData = [
    { title: "Sold Vinyls", text: artistDetails.soldVinyls },
    { title: "Views", text: artistDetails.views },
    { title: "Featured", text: artistDetails.featured },
  ];

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>About Artist</h4>
      <p>{artistDetails.aboutArtist}</p>
      <ul className={styles.artistNumbers}>
        {artistData.map((data) => (
          <li key={data.text}>
            <h5>{data.title}</h5>
            <p className={styles.nums}>{data.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutArist;
