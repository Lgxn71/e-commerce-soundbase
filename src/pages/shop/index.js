import Shop from "../../../components/Shop/Shop";
import sendRequest from "../../../helper/SendRequest";

const ShopPage = ({ recordsQuantity, albums, artists }) => {
  return (
    <Shop recordsQuantity={recordsQuantity} albums={albums} artists={artists} />
  );
};

export default ShopPage;

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.URL}/api/filter-albums`, {
    method: "POST",
    body: JSON.stringify({ activeFilter: "All" }),
  });

  const data = await res.json();
  return {
    props: {
      recordsQuantity: data.recordsQuantity,
      albums: data.albums,
      artists: data.artists,
    },
    revalidate: 2000,
  };
};

// const [data, res] = await sendRequest(
//   `${process.env.URL}/api/filter-albums`,
//   "POST",
//   { activeFilter: "All" }
// );
