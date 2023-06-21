import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Container from "../../../components/UI/Container/Container";
import User from "../../../components/User/User";
import { poppins } from "../_app";

const UserPage = () => {
  const [id, setId] = useState("");
  const session = useSession();
  const router = useRouter();

  const getId = async () => {
    const findUser = await fetch("/api/auth/getid", {
      method: "POST",
      body: JSON.stringify({ email: session.data.session.user.email }),
      "Content-Type": "application/json",
    });

    const userId = await findUser.json();

    setId(userId._id);
  };

  if (session.status === "authenticated") {
    getId().then((res) => {
      console.log(res);
    });
  }

  if (session.status === "loading") {
    return (
      <>
        <p>loading</p>
      </>
    );
  }
  if (session.status === "unauthenticated" || `/user/${id}` !== router.asPath) {
    return (
      <>
        <p>You are not allowed to visit this page</p>
      </>
    );
  }

  return (
    <>
      <Container>
        <h2
          className={poppins.className}
          style={{
            fontWeight: 700,
            fontSize: "50px",
            lineHeight: "75px",
            letterSpacing: "-0.03em",

            color: "#ffffff",

            paddingTop: "120px",
            paddingBottom: "20px",
          }}
        >
          My Profile
        </h2>
      </Container>
      <User session={session} />
    </>
  );
};

export default UserPage;
