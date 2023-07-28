import Link from "next/link";

import Card from "../../UI/Cards/CardEmpty/CartEmpty";
import Button from "../../UI/Buttons/Button";

import { poppins } from "../../../src/pages/_app";

import styles from "./Failure.module.css";
import Container from "../../UI/Container/Container";
const Failed = () => {
  return (
    <Container isBorderThere={true}>
      <Card>
        <div className={`${styles.body}`}>
          <h4>Something Went Wrong!</h4>
          <p>
            We aren’t able to to process your payment. Please try again later.
          </p>
          <Link href="/shop">
            <Button>Discover</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Failed;
