import { poppins } from "@/pages/_app";
import Layout from "../../../../components/Layout/Layout";
import Bill from "../../../../components/UI/Bill/Bill";
import Container from "../../../../components/UI/Container/Container";

const Success = () => {
  return (
    <Layout>
      <h2
        className={poppins.className}
        style={{
          paddingTop: "120px",
          fontwWeight: 700,
          fontSize: "50px",
          lineHeight: "75px",
          letterSpacing: "-0.03em",

          textAlign: "center",

          color: "#FFFFFF",
        }}
      >
        Payment Success!
      </h2>
      <Container isBorderThere={true}>
        <Bill></Bill>
      </Container>
    </Layout>
  );
};

export default Success;
