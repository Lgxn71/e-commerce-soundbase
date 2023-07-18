import Shop from "../../../components/Shop/Shop";
import sendRequest from "../../../helper/SendRequest";
const ShopPage = ({ initialData }) => {
  return (
    <>
      <Shop initialData={initialData} />
    </>
  );
};

export default ShopPage;

export const getStaticProps = async () => {
  try {
    const [data, res] = await sendRequest(
      `${process.env.URL}/api/filtered-albums`,
      "POST",
      {
        activeFilter: "All",
      }
    );
    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
