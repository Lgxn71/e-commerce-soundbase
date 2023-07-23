import Shop from "../../../components/Shop/Shop";
import sendRequest from "../../../helper/SendRequest";

const ShopPage = ({ recordsQuantity, albums, artists }) => {
  return (
    <Shop recordsQuantity={recordsQuantity} albums={albums} artists={artists} />
  );
};

export default ShopPage;

export const getStaticProps = async () => {
  try {
    const [data, res] = await sendRequest(
      `${process.env.URL}/api/filtered-albums`,
      "POST",
      { activeFilter: "All" }
    );
    const { recordsQuantity, albums, artists } = data;

    return {
      props: {
        recordsQuantity,
        albums,
        artists,
      },
      revalidate: 5000,
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        da: "da",
      },
      revalidate: 5000,
    };
  }
};
