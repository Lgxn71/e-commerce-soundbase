import { useState } from "react";

import { useRouter } from "next/router";

import useFormInput from "../../../hooks/useFormInput";

import { signIn } from "next-auth/react";

import Form from "../../../components/UI/Form/Form";

import styles from "../../styles/sign/signin.module.css";

const SignIn = () => {
  const router = useRouter();

  const errorInitial = { isError: false, errorMessage: "" };
  const [emailError, setEmailError] = useState(errorInitial);
  const [passwordError, setPasswordError] = useState(errorInitial);

  const { user, onChangeInput } = useFormInput({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setEmailError(errorInitial);
    setPasswordError(errorInitial);

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!res.ok) {
      if (res.error === "User not found") {
        setEmailError({ isError: true, errorMessage: res.error });
        return;
      }
      if (res.error === "Invalid password") {
        setPasswordError({ isError: true, errorMessage: res.error });
        return;
      }
    }

    const findUser = await fetch("/api/auth/getid", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      "Content-Type": "application/json",
    });
    const userId = await findUser.json();

    router.push(`/user/${userId._id}`);
  };

  // REFACTOR TO AUTH PAGE

  return (
    <>
      <Form
        hrefLink={"/auth/signup"}
        text="Don’t"
        hrefText="Sign Up"
        title="Sign in"
        formSubmitHandler={formSubmitHandler}
      >
        <input
          className={`${styles.input}
          ${emailError.isError ? styles.isError : styles.noErrorInput} `}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          required
          onChange={onChangeInput}
        />
        {emailError.isError ? (
          <p className={styles.errorMessage}>{emailError.errorMessage}</p>
        ) : undefined}

        <input
          className={`${styles.input} 
         ${passwordError.isError ? styles.isError : styles.noErrorInput} 
     `}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={onChangeInput}
        />
        {passwordError.isError ? (
          <p className={styles.errorMessage}>{passwordError.errorMessage}</p>
        ) : undefined}
      </Form>
    </>
  );
};

export default SignIn;
