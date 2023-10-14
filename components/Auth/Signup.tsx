import { FC, FormEvent, ChangeEvent } from "react";

import { useSession } from "next-auth/react";

import Layout from "../Layout/Layout";
import Form from "../UI/Form/Form";
import Input from "../UI/Form/Input";

import styles from "./Signup.module.css";

interface ISignupProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  formValidation: {
    emailError: { isError: boolean; errorMessage: string };
    passwordError: { isError: boolean; errorMessage: string };
    clientValidation: { isError: boolean; errorMessage: string };
  };
  userInput: {
    name: string;
    email: string;
    address: string;
    password: string;
    confirmPassword: string;
  };
}

const Signup: FC<ISignupProps> = ({
  onChangeInput,
  onSubmit,
  formValidation,
  userInput,
}) => {
  const session = useSession();
  return session.status === "authenticated" ? (
    <Layout>
      <p>Please logout to signup in a new account</p>
    </Layout>
  ) : (
    <Form
      hrefLink="/auth/signin"
      text="Already"
      hrefText="Sign In"
      title="Sign up"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={userInput.name}
        onChangeInput={onChangeInput}
      />

      <Input
        isError={formValidation.emailError.isError}
        errorMessage={formValidation.emailError.errorMessage}
        value={userInput.email}
        onChangeInput={onChangeInput}
        type="email"
        name="email"
        placeholder="Enter your email address"
      />

      <Input
        type="text"
        name="address"
        placeholder="Enter your home address"
        value={userInput.address}
        onChangeInput={onChangeInput}
      />

      <input
        className={`${styles.input} 
           ${
             formValidation.passwordError.isError
               ? styles.isError
               : styles.noErrorInput
           }`}
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        required
        value={userInput.password}
        onChange={onChangeInput}
      />

      <input
        className={`${styles.input} ${
          formValidation.passwordError.isError
            ? styles.isError
            : styles.noErrorInput
        }`}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm your password"
        required
        value={userInput.confirmPassword}
        onChange={onChangeInput}
      />
      {formValidation.passwordError.isError && (
        <p className={styles.errorMessage}>
          {formValidation.passwordError.errorMessage}
        </p>
      )}

      {formValidation.clientValidation.isError && (
        <p className={styles.errorMessage}>
          {formValidation.clientValidation.errorMessage}
        </p>
      )}
    </Form>
  );
};

export default Signup;
