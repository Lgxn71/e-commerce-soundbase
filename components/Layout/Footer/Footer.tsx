import Container from "../../UI/Container/Container";

import NewsLetter from "./Newsletter/Newsletter";
import FooterLinks from "./Links/FooterLinks";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <Container isBorderThere={true}>
        <div className={styles.footerContent}>
          <NewsLetter />
          <FooterLinks />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
