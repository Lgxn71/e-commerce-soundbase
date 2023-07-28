import Shop from "../../../components/Shop/Shop";
import sendRequest from "../../../helper/SendRequest";

const ShopPage = ({ recordsQuantity = 1, albums = [], artists = [] }) => {
  return (
    <Shop recordsQuantity={recordsQuantity} albums={albums} artists={artists} />
  );
};

export default ShopPage;

export const getStaticProps = async () => {
  let props = {};
  try {
    const [data, res] = await sendRequest(
      `${process.env.URL}/api/filter-albums`,
      "POST",
      { activeFilter: "All" }
    );

    return {
      props: {
        recordsQuantity: data.recordsQuantity,
        albums: data.albums,
        artists: data.artists,
      },
    };
  } catch (error) {
    console.error(error);
  }
  return {
    props,
  };
};
