import Link from "next/link";

import PageTitle from "../../../components/UI/PageTitle/PageTitle";

import Container from "../../../components/UI/Container/Container";
import Cards from "../../../components/UI/Cards/Cards";
import Buttons from "../../../components/UI/Buttons/Buttons";

import styles from "./FailPayment.module.css";

const PaymentFailedPage = () => {
  return (
    <>
      <PageTitle isCenter={true} title="Payment Failed!" />

      <Container isBorderThere={true}>
        <Cards.Empty>
          <div className={`${styles.body}`}>
            <h4>Something Went Wrong!</h4>
            <p>
              We aren’t able to to process your payment. Please try again later.
            </p>
            <Link href="/shop">
              <Buttons.White>Discover</Buttons.White>
            </Link>
          </div>
        </Cards.Empty>
      </Container>
    </>
  );
};

export default PaymentFailedPage;
