import Shop from "../../../components/Shop/Shop";
import sendRequest from "../../../helper/SendRequest";

const ShopPage = ({ data = null }) => {
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
  const res = await fetch(`${process.env.URL}/api/filter-albums`, {
    method: "POST",
    body: JSON.stringify([{ activeFilter: "All" }]),
  });
  console.log(res.status);

  const data = await res.json();
  // const [data, res] = await sendRequest(
  //   `${process.env.URL}/api/filter-albums`,
  //   "POST",
  //   { activeFilter: "All" }
  // );

  return {
    props: data,
    revalidate: 2000,
  };
};
