import Shop from "../../../components/Shop/Shop";
const ShopPage = ({ initialData }) => {
  return (
    <>
      <Shop initialData={initialData} />
    </>
  );
};

export default ShopPage;

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.URL}/api/filtered-albums`, {
    method: "POST",
    body: JSON.stringify({ activeFilter: "All" }),
    "Content-Type": "application/json",
  });
  
  const allAlbumsData = await response.json();

  return {
    props: {
      initialData: allAlbumsData,
    },
  };
};
