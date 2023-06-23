import { useState } from "react";
import useFormInput from "../../../hooks/useFormInput";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

import Signup from "../../../components/Auth/Signup";
import sendRequest from "../../../helper/SendRequest";

import errorInitial from "../../../sharedContent/errorInitial/errorInitial";

const SignUpPage = () => {
  const router = useRouter();
  const session = useSession();

  const [formValidation, setFormValidation] = useState({
    emailError: errorInitial,
    passwordError: errorInitial,
    clientValidation: errorInitial,
  });

  const { user, onChangeInput } = useFormInput({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, address, password, confirmPassword } = user;

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setFormValidation({
      emailError: errorInitial,
      passwordError: errorInitial,
      clientValidation: errorInitial,
    });

    if (
      !email.includes("@") ||
      email.trim() === "" ||
      name.trim() === "" ||
      address.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setFormValidation({
        ...formValidation,
        clientValidation: {
          isError: true,
          errorMessage: "Invalid credentianls",
        },
      });
      return;
    }

    const [data, res] = await sendRequest("/api/auth/signup", "POST", {
      name: name,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!res.ok) {
      if (
        data.message ===
          "Password is too short, at least 8 characters needed" ||
        data.message === "Passwords doesnt match"
      ) {
        setFormValidation({
          ...formValidation,
          passwordError: {
            isError: true,
            errorMessage: data.message,
          },
        });

        return;
      }

      if (data.message === "User Exist already") {
        setFormValidation({
          ...formValidation,
          emailError: {
            isError: true,
            errorMessage: data.message,
          },
        });
      }
      return;
    }

    router.push("/auth/signin");
  };

  return (
    <Signup
      session={session}
      onChangeInput={onChangeInput}
      formSubmitHandler={formSubmitHandler}
      formValidation={formValidation}
    />
  );
};

export default SignUpPage;
