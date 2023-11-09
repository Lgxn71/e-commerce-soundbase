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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, onChangeInput } = useFormInput({
    email: "",
    password: "",
  }) as {
    user: {
      email: string;
      password: string;
    };
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  const { email, password } = user;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading((prev) => true);

      setFormValidation((prev) => ({
        emailError: errorInitial,
        passwordError: errorInitial,
      }));

      if (email.trim() === "")
        return setFormValidation((prev) => ({
          ...prev,
          emailError: { isError: true, errorMessage: "Email field empty" },
        }));

      if (password.trim() === "")
        return setFormValidation((prev) => ({
          ...prev,
          passwordError: {
            isError: true,
            errorMessage: " Password field empty",
          },
        }));

      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (!res?.ok) {
        if (res?.error === "User not found") {
          setFormValidation((prev) => ({
            ...prev,
            emailError: { isError: true, errorMessage: res.error! },
          }));
          return;
        }

        if (res?.error === "Invalid password") {
          setFormValidation((prev) => ({
            ...prev,
            passwordError: { isError: true, errorMessage: res.error! },
          }));
          return;
        }
      }

      const [userId] = (await sendRequest("/api/auth/get-id-by-email", "POST", {
        email: email,
      })) as [{ _id: string }];

      if (userId === undefined) return;

      router.push(`/user/${userId._id}`);
    } finally {
      setIsLoading((prev) => false);
    }
  };

  return (
    <Signin
      isLoading={isLoading}
      userInput={user}
      onChangeInput={onChangeInput}
      onSubmit={formSubmitHandler}
      formValidation={formValidation}
    />
  );
};

export default SignInPage;
