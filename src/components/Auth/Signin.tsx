import { FC, FormEvent, ChangeEvent } from "react";
import Form from "../UI/Form/Form";
import Input from "../UI/Form/Input";

interface ISingInProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;

  formValidation: {
    emailError: {
      isError: boolean;
      errorMessage: string;
    };
    passwordError: {
      isError: boolean;
      errorMessage: string;
    };
  };
  userInput: { email: string; password: string };
  isLoading: boolean;
}

const Signin: FC<ISingInProps> = ({
  onSubmit,
  onChangeInput,
  formValidation,
  userInput,
  isLoading,
}) => {
  return (
    <Form
      hrefLink={"/auth/sign-up"}
      text="Don’t"
      hrefText="Sign Up"
      title="Sign in"
      onSubmit={onSubmit}
      isLoading={isLoading}
    >
      <Input
        isError={formValidation.emailError.isError}
        errorMessage={formValidation.emailError.errorMessage}
        value={userInput.email}
        onChangeInput={onChangeInput}
        placeholder="Enter your email address"
        type="email"
        name="email"
      />

      <Input
        isError={formValidation.passwordError.isError}
        errorMessage={formValidation.passwordError.errorMessage}
        value={userInput.password}
        onChangeInput={onChangeInput}
        type="password"
        name="password"
        placeholder="Enter your password"
      />
    </Form>
  );
};

export default Signin;
