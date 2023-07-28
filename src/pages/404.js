import Link from "next/link";

import PageTitle from "../../components/UI/PageTitle/PageTitle";
import Container from "../../components/UI/Container/Container";
import ButtonEmptyBlack from "../../components/UI/Buttons/ButtonEmptyBlack";

import styles from "../styles/404.module.css";
const custom404Page = () => {
  return (
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
            <ButtonEmptyBlack>Back To Home</ButtonEmptyBlack>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default custom404Page;
