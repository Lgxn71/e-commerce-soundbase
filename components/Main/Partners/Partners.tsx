import Container from "../../UI/Container/Container";

import Icons from "../../UI/Icons/Icons";

import styles from "./Partners.module.css";

const Partner = () => {
  const mapLogos1 = [0, 1, 2, 3, 4];
  const mapLogos2 = [0, 1, 2, 3];

  return (
    <Container isBorderThere={false}>
      <div className={styles.partners}>
        <h3 className={styles.title}>
          Music enthusiasts all over the world trust SoundBase to purchase vinyl
          records.
        </h3>

        <div className={styles.logos}>
          <ul>
            {mapLogos1.map((logo) => (
              <li key={logo}>
                <Icons.Visa />
              </li>
            ))}
          </ul>
          <ul>
            {mapLogos2.map((logo) => (
              <li key={logo}>
                <Icons.Visa />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Partner;
