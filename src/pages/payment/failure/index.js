import Failed from "../../../../components/Payment/Failure/Failure";
import PageTitle from "../../../../components/UI/PageTitle/PageTitle";

const PaymentFailedPage = () => {
  return (
    <>
      <PageTitle isCenter={true} title="Payment Failed!" />
      <Failed></Failed>
    </>
  );
};

export default PaymentFailedPage;
