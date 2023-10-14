import { useState, FormEvent, ChangeEvent } from "react";
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
  // LOADING STATE
  const { user, onChangeInput } = useFormInput({
    email: "",
    password: "",
  }) as {
    user: {
      name: string;
      email: string;
      address: string;
      password: string;
      confirmPassword: string;
    };
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  const { email, password } = user;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormValidation((prev) => ({
      emailError: errorInitial,
      passwordError: errorInitial,
    }));

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!res?.ok) {
      if (res?.error === "User not found")
        return setFormValidation((prev) => ({
          ...prev,
          emailError: { isError: true, errorMessage: res.error! },
        }));

      if (res?.error === "Invalid password")
        return setFormValidation((prev) => ({
          ...prev,
          passwordError: { isError: true, errorMessage: res.error! },
        }));
    }

    const [userId] = (await sendRequest("/api/auth/get-id-by-email", "POST", {
      email: email,
    })) as [{ _id: string }];

    router.push(`/user/${userId._id}`);
  };

  return (
    <Signin
      userInput={user}
      onChangeInput={onChangeInput}
      onSubmit={formSubmitHandler}
      formValidation={formValidation}
    />
  );
};

export default SignInPage;
