import { useState } from "react";
// add useSession validation

import { useRouter } from "next/router";

import useFormInput from "../../../hooks/useFormInput";

import Form from "../../../components/UI/Form/Form";

import styles from "../../styles/sign/signup.module.css";

const errorInitial = { isError: false, errorMessage: "" };

const SignUp = () => {
  const router = useRouter();

  const [emailError, setEmailError] = useState(errorInitial);
  const [passwordError, setPasswordError] = useState(errorInitial);
  const [clientValidation, setClientError] = useState(errorInitial);

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

    setPasswordError(errorInitial);
    setClientError(errorInitial);
    setEmailError(errorInitial);

    // client side validation
    if (
      !email.includes("@") ||
      email.trim() === "" ||
      name.trim() === "" ||
      address.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setClientError({ isError: true, errorMessage: "Invalid credentianls" });
      return;
    }

    if (password.length < 8) {
      setPasswordError({
        isError: true,
        errorMessage: "Password is too short, at least 8 characters needed",
      });
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setPasswordError({
        isError: true,
        errorMessage:
          "Invalid password, should be at least 8 characters and match",
      });
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        address: address,
        password: password,
        confirmPassword: confirmPassword,
      }),
      "Content-Type": "application/json",
    });

    const data = await res.json();

    if (!res.ok) {
      if (
        data.message === "Password is too short, at least 8 characters needed"
      ) {
        setPasswordError({
          isError: true,
          errorMessage: data.message,
        });
      }

      if (data.message === "Passwords doesnt match") {
        setPasswordError({
          isError: true,
          errorMessage: data.message,
        });
      }

      if (data.message === "User Exist already") {
        setEmailError({ isError: true, errorMessage: data.message });
      }
    }

    router.push("/auth/signin");
  };

  return (
    <Form
      hrefLink={"/auth/signin"}
      text="Already"
      hrefText="Sign In"
      title="Sign up"
      formSubmitHandler={formSubmitHandler}
    >
      <input
        className={`${styles.input} ${styles.noErrorInput}`}
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        required
        onChange={onChangeInput}
      />
      <input
        className={`${styles.input} ${
          emailError.isError ? styles.isError : styles.noErrorInput
        }`}
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
        className={`${styles.input} ${styles.noErrorInput}`}
        type="text"
        name="address"
        id="address"
        placeholder="Enter your home address"
        required
        onChange={onChangeInput}
      />

      <input
        className={`${styles.input} 
        ${passwordError.isError ? styles.isError : styles.noErrorInput}`}
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        required
        onChange={onChangeInput}
      />

      <input
        className={`${styles.input} ${
          passwordError.isError ? styles.isError : styles.noErrorInput
        }`}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm your password"
        required
        onChange={onChangeInput}
      />
      {passwordError.isError ? (
        <p className={styles.errorMessage}>{passwordError.errorMessage}</p>
      ) : undefined}

      {clientValidation.isError ? (
        <p className={styles.errorMessage}>{clientValidation.errorMessage}</p>
      ) : undefined}
    </Form>
  );
};

export default SignUp;
