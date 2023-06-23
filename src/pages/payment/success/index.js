import { poppins } from "@/pages/_app";

import Container from "../../../../components/UI/Container/Container";
import Bill from "../../../../components/UI/Bill/Bill";

import styles from "../../../styles/payment/success/Success.module.css";
const Success = () => {
  return (
    <>
      <h2 className={`${poppins.className} ${styles.title}`}>
        Payment Success!
      </h2>
      <Container isBorderThere={true}>
        <Bill />
      </Container>
    </>
  );
};

export default Success;
