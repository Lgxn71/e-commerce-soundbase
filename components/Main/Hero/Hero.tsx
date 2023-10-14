import Link from "next/link";

import Button from "../../UI/Buttons/Button";
import Container from "../../UI/Container/Container";

import { poppins } from "../../../src/pages/_app";

import styles from "./Hero.module.css";

const Hero = () => (
  <div className={`${poppins.variable} ${styles.heroSection}`}>
    <Container>
      <div className={styles.heroContent}>
        <h2>Discover the Ultimate Vinyl Collection</h2>

        <p>
          Welcome to our Vinyl E-Commerce Wonderland! Immerse yourself in a
          world where music comes alive, as we proudly present the ultimate
          destination for all vinyl enthusiasts.{" "}
        </p>

        <div className={styles.actions}>
          <Link href="/auth/signin">
            <Button>Get Started</Button>
          </Link>

          <Link className={styles.link} href="/shop">
            Discover
          </Link>
        </div>
      </div>
    </Container>
  </div>
);
export default Hero;
