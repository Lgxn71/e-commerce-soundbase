import { useState, FormEvent, ChangeEvent } from "react";

import { useRouter } from "next/router";

import useFormInput from "../../hooks/useFormInput";

import Signup from "../../components/Auth/Signup";
import sendRequest from "../../helper/SendRequest";

import errorInitial from "../../sharedContent/errorInitial/errorInitial";

const SignUpPage = () => {
  const router = useRouter();

  const [formValidation, setFormValidation] = useState({
    emailError: errorInitial,
    passwordError: errorInitial,
    clientValidation: errorInitial,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, onChangeInput } = useFormInput({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
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
  const { name, email, address, password, confirmPassword } = user;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading((prev) => true);

      setFormValidation((prev) => ({
        emailError: errorInitial,
        passwordError: errorInitial,
        clientValidation: errorInitial,
      }));

      if (
        !email.includes("@") ||
        email.trim() === "" ||
        name.trim() === "" ||
        address.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      )
        return setFormValidation((prev) => ({
          ...prev,
          clientValidation: {
            isError: true,
            errorMessage: "Invalid credentianls",
          },
        }));

      const [data, res] = (await sendRequest("/api/auth/signup", "POST", {
        name: name,
        email: email,
        address: address,
        password: password,
        confirmPassword: confirmPassword,
      })) as [{ message: string }, Response];

      if (!res.ok) {
        if (
          data.message ===
            "Password is too short, at least 8 characters needed" ||
          data.message === "Passwords doesnt match"
        )
          return setFormValidation((prev) => ({
            ...prev,
            passwordError: {
              isError: true,
              errorMessage: data.message,
            },
          }));

        if (data.message === "User Exist already")
          return setFormValidation((prev) => ({
            ...prev,
            emailError: {
              isError: true,
              errorMessage: data.message,
            },
          }));

        return;
      }

      router.push("/auth/sign-in");
    } finally {
      setIsLoading((prev) => false);
    }
  };

  return (
    <Signup
      isLoading={isLoading}
      userInput={user}
      onChangeInput={onChangeInput}
      onSubmit={formSubmitHandler}
      formValidation={formValidation}
    />
  );
};

export default SignUpPage;
