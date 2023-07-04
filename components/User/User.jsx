import { useState, useEffect } from "react";

import Link from "next/link";

import UserDataCard from "./UserDataCard/UserDataCard";
import Container from "../UI/Container/Container";

import sendRequest from "../../helper/SendRequest";
import errorInitial from "../../sharedContent/errorInitial/errorInitial";

import { poppins } from "@/pages/_app";

import styles from "./User.module.css";

const User = ({ session }) => {
  const [userData, setUserData] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
  });

  console.log(userData.nameInput.length);

  const [formValidation, setFormValidation] = useState({
    nameInput: errorInitial,
    emailInput: errorInitial,
    addressInput: errorInitial,
  });

  console.log(formValidation);

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
          <aside>
            <ul className={styles.links}>
              <li>
                <a>General</a>
              </li>
              <li>
                <a>Purchase History</a>
              </li>
            </ul>
          </aside>

          <div className={styles.details}>
            <UserDataCard
              title="Full Name"
              label="Please enter your full name, or a display name you are comfortable with"
              bottomText="Please use 32 characters at maximum."
              inputValue={userData.nameInput}
              onChangeInput={(event) => handleInputChange(event, "nameInput")}
              onSubmit={(event) =>
                handleSubmit(event, "name", userData.nameInput)
              }
              inputType="text"
              name="name"
              isError={formValidation.nameInput.isError}
              errorMessage={formValidation.nameInput.errorMessage}
            />

            <UserDataCard
              title="Email"
              label="Please enter the email address you want to use to log in with Soundbase."
              bottomText="We will email you to verify the change"
              inputValue={userData.emailInput}
              onChangeInput={(event) => handleInputChange(event, "emailInput")}
              onSubmit={(event) =>
                handleSubmit(event, "email", userData.emailInput)
              }
              inputType="email"
              name="email"
              isError={formValidation.emailInput.isError}
              errorMessage={formValidation.emailInput.errorMessage}
            />

            <UserDataCard
              title="Address"
              label="Please enter the address where you want to ship your vinyls."
              bottomText="We will email you to verify the change"
              inputValue={userData.addressInput}
              onChangeInput={(event) =>
                handleInputChange(event, "addressInput")
              }
              onSubmit={(event) =>
                handleSubmit(event, "address", userData.addressInput)
              }
              inputType="text"
              name="address"
              isError={formValidation.addressInput.isError}
              errorMessage={formValidation.addressInput.errorMessage}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default User;
