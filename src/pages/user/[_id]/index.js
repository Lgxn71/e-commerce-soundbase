import { useSession } from "next-auth/react";

import User from "../../../../components/User/User";

const UserPage = ({}) => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return <p>unauth</p>;
  }

  // ! СДЕЛАТЬ LOADNG SKELETON
  if (session.status === "loading") {
    return (
      <>
        <p>loading</p>
      </>
    );
  }

  return (
    <>
      <User session={session} />
    </>
  );
};

export default UserPage;
