import { useState } from "react";
import useFormInput from "../../../hooks/useFormInput";

import { useRouter } from "next/router";

import { signIn } from "next-auth/react";

import Signin from "../../../components/Auth/Signin";

import sendRequest from "../../../helper/SendRequest";

import errorInitial from "../../../sharedContent/errorInitial/errorInitial";

const SignInPage = () => {
  const router = useRouter();

  const [formValidation, setFormValidation] = useState({
    emailError: errorInitial,
    passwordError: errorInitial,
  });

  const { user, onChangeInput } = useFormInput({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setFormValidation({
      emailError: errorInitial,
      passwordError: errorInitial,
    });

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!res.ok) {
      if (res.error === "User not found") {
        setFormValidation({
          ...formValidation,
          emailError: { isError: true, errorMessage: res.error },
        });
        return;
      }
      if (res.error === "Invalid password") {
        setFormValidation({
          ...formValidation,
          passwordError: { isError: true, errorMessage: res.error },
        });
        return;
      }
    }

    const [userId] = await sendRequest("/api/auth/getid", "POST", {
      email: email,
    });

    router.push(`/user/${userId._id}`);
  };

  return (
    <Signin
      onChangeInput={onChangeInput}
      formSubmitHandler={formSubmitHandler}
      formValidation={formValidation}
    />
  );
};

export default SignInPage;
