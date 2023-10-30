import Link from "next/link";

import PageTitle from "../../components/UI/PageTitle/PageTitle";
import Container from "../../components/UI/Container/Container";
import Buttons from "../../components/UI/Buttons/Buttons";

import styles from "../styles/404.module.css";
const custom404Page = () => (
  <>
    <PageTitle isCenter={true} title="404"></PageTitle>
    <Container isBorderThere={true}>
      <div className={styles.body}>
        <h4>Oops, page not found</h4>
        <p>
          Can’t find the page you are looking for, please make sure the web
          address is correct
        </p>
        <Link href="/">
          <Buttons.EmptyBlack>Back To Home</Buttons.EmptyBlack>
        </Link>
      </div>
    </Container>
  </>
);
export default custom404Page;
