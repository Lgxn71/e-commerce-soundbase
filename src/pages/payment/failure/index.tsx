import PageTitle from "../../../../components/UI/PageTitle/PageTitle";
import Link from "next/link";
import Container from "../../../../components/UI/Container/Container";
import Card from "../../../../components/UI/Cards/CardEmpty/CartEmpty";

import Button from "../../../../components/UI/Buttons/Button";

import styles from "./FailPayment.module.css";

const PaymentFailedPage = () => {
  return (
    <>
      <PageTitle isCenter={true} title="Payment Failed!" />

      <Container isBorderThere={true}>
        <Card>
          <div className={`${styles.body}`}>
            <h4>Something Went Wrong!</h4>
            <p>
              We aren’t able to to process your payment. Please try again later.
            </p>
            <Link href="/shop">
              <Button>Discover</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default PaymentFailedPage;
