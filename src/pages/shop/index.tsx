import { FC } from "react";

import { GetServerSideProps } from "next";

import { Album, Artist } from "../../types/db";

import { sendRequest } from "../../helper/util";

import Shop from "../../components/Shop/Shop";

export interface ShopPageProps {
  recordsQuantity: number;
  albums: Album[];
  artists: Artist[];
}

const ShopPage: FC<ShopPageProps> = ({ recordsQuantity, albums, artists }) => (
  <Shop recordsQuantity={recordsQuantity} albums={albums} artists={artists} />
);

export default ShopPage;

export const getServerSideProps = (async () => {
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
}) 