import { useState } from "react";

import Bill from "../../../../components/Payment/Bill/Bill";

import Container from "../../../../components/UI/Container/Container";

const Success = () => {
  return (
    <Container isBorderThere={true}>
      <Bill />
    </Container>
  );
};

export default Success;
