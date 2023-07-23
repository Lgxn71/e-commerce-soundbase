import Shop from "../../../components/Shop/Shop";
import sendRequest from "../../../helper/SendRequest";

const ShopPage = ({ data }) => {
  return (
    <Shop
      recordsQuantity={data.recordsQuantity}
      albums={data.albums}
      artists={data.artists}
    />
  );
};

export default ShopPage;

export const getStaticProps = async () => {
  const [data, res] = await sendRequest(
    `${process.env.URL}/api/filter-albums`,
    "POST",
    { activeFilter: "All" }
  );
x
  return {
    props: data,
  };
};
