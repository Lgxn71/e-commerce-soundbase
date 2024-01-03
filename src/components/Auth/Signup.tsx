import { FC, FormEvent, ChangeEvent } from "react";

import { useSession } from "next-auth/react";

import Layout from "../Layout/Layout";
import Form from "../UI/Form/Form";
import Input from "../UI/Form/Input";

import { SignUpForm } from "../../helper/validations/signUpValidation";
import { ErrorForm } from "../../sharedContent/errorInitial/errorInitial";

interface ISignupProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  formValidation: {
    nameError: ErrorForm;
    addressError: ErrorForm;
    emailError: ErrorForm;
    passwordError: ErrorForm;
    confirmPasswordError: ErrorForm;
  };
  userInput: SignUpForm;
  isLoading: boolean;
}

const Signup: FC<ISignupProps> = ({
  onChangeInput,
  onSubmit,
  formValidation,
  userInput,
  isLoading,
}) => {
  const session = useSession();
  return session.status === "authenticated" ? (
    <Layout>
      <p>Please logout to signup in a new account</p>
    </Layout>
  ) : (
    <Form
      isLoading={isLoading}
      hrefLink="/auth/sign-in"
      text="Already"
      hrefText="Sign In"
      title="Sign up"
      onSubmit={onSubmit}
    >
      <Input
        isError={formValidation.nameError.isError}
        errorMessage={formValidation.nameError.errorMessage}
        type="text"
        name="name"
        placeholder="Enter your name"
        required
        value={userInput.name}
        onChangeInput={onChangeInput}
      />
      <Input
        isError={formValidation.emailError.isError}
        errorMessage={formValidation.emailError.errorMessage}
        value={userInput.email}
        onChangeInput={onChangeInput}
        type="email"
        required
        name="email"
        placeholder="Enter your email address"
      />
      <Input
        isError={formValidation.addressError.isError}
        errorMessage={formValidation.addressError.errorMessage}
        type="text"
        name="address"
        placeholder="Enter your home address"
        required
        value={userInput.address}
        onChangeInput={onChangeInput}
      />
      <Input
        isError={formValidation.passwordError.isError}
        errorMessage={formValidation.passwordError.errorMessage}
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={userInput.password}
        onChangeInput={onChangeInput}
        required
      />
      <Input
        isError={formValidation.confirmPasswordError.isError}
        errorMessage={formValidation.confirmPasswordError.errorMessage}
        value={userInput.confirmPassword}
        onChangeInput={onChangeInput}
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm your password"
        required
      />
    </Form>
  );
};

export default Signup;
