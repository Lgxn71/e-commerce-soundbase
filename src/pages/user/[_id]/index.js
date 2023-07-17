import { useSession } from "next-auth/react";

import User from "../../../../components/User/User";
import Container from "../../../../components/UI/Container/Container";
import PageTitle from "../../../../components/UI/PageTitle/PageTitle";

const UserPage = ({}) => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    <Container>
      <PageTitle title="My Profile" />
    </Container>;
    return <p>unauth</p>;
  }

  if (session.status === "loading") {
    return (
      <>
        <Container>
          <PageTitle title="My Profile" />
        </Container>
        <p>loading</p>
      </>
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
