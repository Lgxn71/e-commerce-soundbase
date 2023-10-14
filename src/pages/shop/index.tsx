import { FC } from "react";

import { GetStaticProps } from "next";

import { Artist, Record } from "../../types/db";

import sendRequest from "../../../helper/SendRequest";

import Shop from "../../../components/Shop/Shop";

export interface ShopPageProps {
  recordsQuantity: number;
  albums: Record[];
  artists: Artist[];
}

const ShopPage: FC<ShopPageProps> = ({
  recordsQuantity = 1,
  albums = [],
  artists = [],
}) => {
  return (
    <Shop recordsQuantity={recordsQuantity} albums={albums} artists={artists} />
  );
};

export default ShopPage;

export const getStaticProps = (async () => {
  let props = {};
  try {
    const [data] = (await sendRequest(
      `${process.env.URL}/api/filter-albums`,
      "POST",
      { activeFilter: "All" }
    )) as [ShopPageProps];

    if (data) {
      return {
        props: {
          recordsQuantity: data.recordsQuantity,
          albums: data.albums,
          artists: data.artists,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props,
  };
}) satisfies GetStaticProps;
