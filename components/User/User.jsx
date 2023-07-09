import { useState, useEffect } from "react";

import Navigation from "./Navigation/Navigation.jsx";
import UserProfile from "./UserData/UserProfile.jsx";
import UserPurchaseHistory from "./UserData/UserPurchaseHistory.jsx";

import Container from "../UI/Container/Container";

import sendRequest from "../../helper/SendRequest";
import errorInitial from "../../sharedContent/errorInitial/errorInitial";

import { poppins } from "@/pages/_app";

import styles from "./User.module.css";

const User = ({ session }) => {
  const [isGeneral, setIsGeneral] = useState(true);

  const [userData, setUserData] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
  });

  const [formValidation, setFormValidation] = useState({
    nameInput: errorInitial,
    emailInput: errorInitial,
    addressInput: errorInitial,
  });

  useEffect(() => {
    setUserData({
      nameInput: session.data.session.user.name,
      emailInput: session.data.session.user.email,
      addressInput: session.data.session.user.address,
    });
  }, [
    session.data.session.user.name,
    session.data.session.user.address,
    session.data.session.user.email,
  ]);

  const handleInputChange = (event, fieldName) => {
    setUserData((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = async (event, fieldName, input) => {
    event.preventDefault();

    setFormValidation({
      nameInput: errorInitial,
      emailInput: errorInitial,
      addressInput: errorInitial,
    });

    const [data, res] = await sendRequest(
      "/api/auth/changecredentials/",
      "POST",
      { id: session.data.session.user.id, [fieldName]: input }
    );

    if (!res.ok) {
      if (
        data.message === "Invalid input, max length is 32 characters" ||
        data.message === "Empty field is invalid for name"
      ) {
        setFormValidation({
          ...userData,
          nameInput: { isError: true, errorMessage: data.message },
        });
        return;
      } else if (
        data.message === "Empty field is invalid for email" ||
        data.message === "Invalid email input" ||
        data.message === "User exist already"
      ) {
        setFormValidation({
          ...userData,
          emailInput: { isError: true, errorMessage: data.message },
        });
      } else if (data.message === "Empty field is invalid for address") {
        setFormValidation({
          ...userData,
          addressInput: { isError: true, errorMessage: data.message },
        });
      }
    }
  };

  return (
    <>
      <Container>
        <h2 className={`${poppins.className} ${styles.title}`}>My Profile</h2>
      </Container>

      <Container isBorderThere={true}>
        <div className={styles.profile}>
          <Navigation isGeneral={isGeneral} onSetIsGeneral={setIsGeneral} />

          {isGeneral ? (
            <UserProfile
              userData={userData}
              onHandleInputChange={handleInputChange}
              onHandleSubmit={handleSubmit}
              formValidation={formValidation}
            />
          ) : (
            <UserPurchaseHistory />
          )}
        </div>
      </Container>
    </>
  );
};

export default User;
