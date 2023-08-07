import { memo } from "react";

import PageTitle from "../../UI/PageTitle/PageTitle";
import Input from "../../UI/Form/Input";

import Search from "../../svg/Search";

import { poppins } from "../../../src/pages/_app";

import styles from "./ShopHeader.module.css";

const ShopHeader = memo(function ShopHeader({ Container }) {
  return (
    <Container>
      <div className={`${poppins.variable} ${styles.header}`}>
        <PageTitle title="Discover" />
        <Input
          id="search"
          placeholder="Search for artist or album name"
          inputType="text"
        />
      </div>
    </Container>
  );
});
export default ShopHeader;
