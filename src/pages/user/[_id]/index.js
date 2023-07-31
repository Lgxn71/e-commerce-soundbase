import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import User from "../../../../components/User/User";
import Container from "../../../../components/UI/Container/Container";
import PageTitle from "../../../../components/UI/PageTitle/PageTitle";

import { poppins } from "../../_app";

const UserPage = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated") {
    setTimeout(() => {
      console.log(1);
      router.push("/auth/signin");
    }, 3000);

    return (
      <Container>
        <PageTitle title="My Profile" />
        <Container isBorderThere={true}>
          <p
            className={poppins.className}
            style={{
              color: "white",
              textAlign: "center",
              margin: "100px",
            }}
          >
            You are not authentificated, redirecting to login page...{" "}
          </p>
        </Container>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <PageTitle title="My Profile" />
      </Container>
      <User session={session} />
    </>
  );
};

export default UserPage;
