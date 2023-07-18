import { useState, useEffect } from "react";

import Navigation from "./Navigation/Navigation.jsx";
import UserProfile from "./UserData/General/UserProfile.jsx";
import UserPurchaseHistory from "./UserData/PurchaseHistory/UserPurchaseHistory.jsx";

import Container from "../UI/Container/Container";

import sendRequest from "../../helper/SendRequest";
import errorInitial from "../../sharedContent/errorInitial/errorInitial";

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
    if (session.status === "authenticated") {
      setUserData({
        nameInput: session.data.user.name,
        emailInput: session.data.user.email,
        addressInput: session.data.user.address,
      });
    }
  }, [session]);

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
      { id: session.data.user.id, [fieldName]: input }
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

  if (session.status === "loading") {
    return (
      <Container isBorderThere={true}>
        <div className={styles.profile}>
          <Navigation isLoading={true} />

          <UserProfile isLoading={true} />
        </div>
      </Container>
    );
  }

  return (
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
          <UserPurchaseHistory
            isGeneral={isGeneral}
            id={session.data.user.id}
          />
        )}
      </div>
    </Container>
  );
};

export default User;
