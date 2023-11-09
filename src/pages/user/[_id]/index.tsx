import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Navigation from "../../../../components/User/Navigation/Navigation";
import UserProfile from "../../../../components/User/UserData/General/UserProfile";
import UserPurchaseHistory from "../../../../components/User/UserData/PurchaseHistory/UserPurchaseHistory";

import Container from "../../../../components/UI/Container/Container";
import PageTitle from "../../../../components/UI/PageTitle/PageTitle";

import { poppins } from "../../_app";

import styles from "./User.module.css";
const UserPage = () => {
  const router = useRouter();
  const session = useSession();

  const [isGeneral, setIsGeneral] = useState<boolean>(true);

  if (session.status === "unauthenticated") {
    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 1500);

    const pStyles = { color: "white", textAligh: "center", margin: "100px" };
    return (
      <Container>
        <PageTitle title="My Profile" />
        <Container isBorderThere={true}>
          <p className={poppins.className} style={pStyles}>
            You are not authentificated, redirecting to login page...{" "}
          </p>
        </Container>
      </Container>
    );
  }

  if (session.status === "loading")
    return (
      <>
        <Container>
          <PageTitle title="My Profile" />
        </Container>

        <Container isBorderThere={true}>
          <div className={styles.profile}>
            <Navigation isLoading={true} />

            <UserProfile isLoading={true} />
          </div>
        </Container>
      </>
    );

  if (session.data)
    return (
      <>
        <Container>
          <PageTitle title="My Profile" />
        </Container>

        <Container isBorderThere={true}>
          <div className={styles.profile}>
            <Navigation isGeneral={isGeneral} onSetIsGeneral={setIsGeneral} />

            {isGeneral ? (
              <UserProfile />
            ) : (
              <UserPurchaseHistory
                isGeneral={isGeneral}
                userId={session.data.user.id}
              />
            )}
          </div>
        </Container>
      </>
    );
};

export default UserPage;
