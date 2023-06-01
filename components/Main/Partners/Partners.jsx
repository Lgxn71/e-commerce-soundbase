import Container from "../../UI/Container/Container";

import VisaSvg from "../../svg/Visa";

import styles from "./Partners.module.css";

const Partner = () => {
  const mapLogos1 = [0, 1, 2, 3, 4];
  const mapLogos2 = [0, 1, 2, 3];

  return (
    <Container isBorderThere={false}>
      <div className={styles.partners}>
        <h3 className={styles.title}>
          Developers all over the world trust Evervault to keep their customer
          data secure and compliant.
        </h3>
        <div>
          <div>
            {mapLogos1.map((logo) => (
              <VisaSvg key={logo} />
            ))}
          </div>
          <div>
            {mapLogos2.map((logo) => (
              <VisaSvg key={logo} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Partner;
