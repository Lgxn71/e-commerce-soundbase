import { poppins } from "@/pages/_app";

import Container from "../../../../components/UI/Container/Container";
import Bill from "../../../../components/UI/Bill/Bill";

const Success = () => {
  return (
    <>
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
        <Bill />
      </Container>
    </>
  );
};

export default Success;
