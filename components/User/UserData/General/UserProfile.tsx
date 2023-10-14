import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";

import UserDataCard from "./UserDataCard";

import sendRequest from "../../../../helper/SendRequest";
import errorInitial from "../../../../sharedContent/errorInitial/errorInitial";

import styles from "./UserProfile.module.css";

import {
  IuserDataInputs,
  InputNames,
  IformValidation,
} from "../../../../src/types/user";

interface IUserProfile {
  isLoading?: boolean;
}

const UserProfile: FC<IUserProfile> = ({ isLoading }) => {
  const session = useSession();

  const [userData, setUserData] = useState<IuserDataInputs>({
    nameInput: "",
    emailInput: "",
    addressInput: "",
  });
  const [formValidation, setFormValidation] = useState<IformValidation>({
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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName: InputNames
  ) => {
    const target = event?.target as HTMLInputElement;
    setUserData((prevState) => ({
      ...prevState,
      [fieldName]: target.value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    fieldName: string,
    userInput: string
  ) => {
    event.preventDefault();

    setFormValidation((prev) => ({
      nameInput: errorInitial,
      emailInput: errorInitial,
      addressInput: errorInitial,
    }));

    let data = { message: "" };
    let response;
    if (session.data) {
      const [dataApi, res] = (await sendRequest(
        "/api/auth/change-credentials/",
        "POST",
        { id: session.data.user.id, [fieldName]: userInput }
      )) as [{ message: string }, Response];

      response = res;
      data = dataApi;
    }

    if (!response?.ok) {
      if (
        data?.message === "Invalid input, max length is 32 characters" ||
        data?.message === "Empty field is invalid for name"
      ) {
        setFormValidation((prev) => ({
          ...formValidation,
          nameInput: { isError: true, errorMessage: data.message },
        }));
      }

      if (
        data?.message === "Empty field is invalid for email" ||
        data?.message === "Invalid email input" ||
        data?.message === "User exist already"
      ) {
        setFormValidation((prev) => ({
          ...formValidation,
          emailInput: { isError: true, errorMessage: data.message },
        }));
      }

      if (data?.message === "Empty field is invalid for address") {
        setFormValidation((prev) => ({
          ...formValidation,
          addressInput: { isError: true, errorMessage: data.message },
        }));
      }
    }
  };

  if (isLoading) {
    const loadingArray = [1, 2, 3];
    return (
      <div className={styles.details}>
        {loadingArray.map((e) => (
          <UserDataCard key={e} isLoading={isLoading} />
        ))}
      </div>
    );
  }

  if (handleInputChange && handleSubmit && formValidation && userData) {
    const userDataCards = [
      {
        title: "Full Name",
        label:
          "Please enter your full name, or a display name you are comfortable with",
        bottomText: "Please use 32 characters at maximum.",
        inputValue: userData?.nameInput,
        onChangeInput: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, "nameInput"),
        onSubmit: (event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, "name", userData?.nameInput),
        inputType: "text",
        name: "name",
        isError: formValidation.nameInput.isError,
        errorMessage: formValidation.nameInput.errorMessage,
      },
      {
        title: "Email",
        label:
          "Please enter the email address you want to use to log in with Soundbase.",
        bottomText: "We will email you to verify the change",
        inputValue: userData?.emailInput,
        onChangeInput: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, "emailInput"),
        onSubmit: (event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, "email", userData?.emailInput),
        inputType: "email",
        name: "email",
        isError: formValidation.emailInput.isError,
        errorMessage: formValidation.emailInput.errorMessage,
      },
      {
        title: "Address",
        label: "Please enter the address where you want to ship your vinyls.",
        bottomText: "We will email you to verify the change",
        inputValue: userData?.addressInput,
        onChangeInput: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, "addressInput"),
        onSubmit: (event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, "address", userData?.addressInput),
        inputType: "text",
        name: "address",
        isError: formValidation.addressInput.isError,
        errorMessage: formValidation.addressInput.errorMessage,
      },
    ];

    return (
      <div className={styles.details}>
        {userDataCards.map((cardData) => (
          <UserDataCard
            key={cardData.title}
            title={cardData.title}
            label={cardData.label}
            bottomText={cardData.bottomText}
            inputValue={cardData.inputValue}
            onChangeInput={cardData.onChangeInput}
            onSubmit={cardData.onSubmit}
            inputType={cardData.inputType}
            name={cardData.name}
            isError={cardData.isError}
            errorMessage={cardData.errorMessage}
          />
        ))}
      </div>
    );
  }
};

export default UserProfile;
