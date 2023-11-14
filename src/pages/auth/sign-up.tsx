import { useState, FormEvent, ChangeEvent } from "react";

import { useRouter } from "next/router";

import useFormInput from "../../hooks/useFormInput";

import Signup from "../../components/Auth/Signup";
import { sendRequest } from "../../helper/util";

import errorInitial from "../../sharedContent/errorInitial/errorInitial";
import signUpFormValidation, {
  SignUpForm,
} from "../../helper/validations/signUpValidation";

const SignUpPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, onChangeInput } = useFormInput({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  }) as {
    user: SignUpForm;
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  const [formValidation, setFormValidation] = useState({
    nameError: errorInitial,
    emailError: errorInitial,
    addressError: errorInitial,
    passwordError: errorInitial,
    confirmPasswordError: errorInitial,
  });
  const { name, email, address, password, confirmPassword } = user;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading((prev) => true);

      setFormValidation((prev) => ({
        nameError: errorInitial,
        emailError: errorInitial,
        addressError: errorInitial,
        passwordError: errorInitial,
        confirmPasswordError: errorInitial,
      }));

      const validatedData = signUpFormValidation(user, setFormValidation);
      if (validatedData === undefined) return;

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
            confirmPasswordError: {
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
