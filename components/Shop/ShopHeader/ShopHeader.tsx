import { FC, memo } from "react";

import Container from "../../UI/Container/Container";

import PageTitle from "../../UI/PageTitle/PageTitle";
import Input from "../../UI/Form/Input";

import { poppins } from "../../../src/pages/_app";

import styles from "./ShopHeader.module.css";

const ShopHeader: FC = memo(function ShopHeader() {
  return (
    <Container>
      <div className={`${poppins.variable} ${styles.header}`}>
        <PageTitle title="Discover" />
        <Input
          name="search"
          id="search"
          placeholder="Search for artist or album name"
          type="text"
        />
      </div>
    </Container>
  );
});
export default ShopHeader;
