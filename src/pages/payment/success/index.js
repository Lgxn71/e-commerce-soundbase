import { useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Container from "../../../../components/UI/Container/Container";
import Bill from "../../../../components/Payment/Bill/Bill";

const Success = () => {
  const router = useRouter();

  const session = useSession();

  const [cartLocal, setCartLocal] = useState({
    quantity: 0,
    sum: 0,
  });

  return (
    <Container isBorderThere={true}>
      <Bill
        router={router}
        session={session}
        cartLocal={cartLocal}
        setCartLocal={setCartLocal}
      />
    </Container>
  );
};

export default Success;
