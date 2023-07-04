import Form from "../UI/Form/Form";
import Input from "../UI/Form/Input";

const Signin = ({
  formSubmitHandler,
  onChangeInput,
  formValidation,
  userInput,
}) => {
  return (
    <Form
      hrefLink={"/auth/signup"}
      text="Don’t"
      hrefText="Sign Up"
      title="Sign in"
      formSubmitHandler={formSubmitHandler}
    >
      <Input
        isError={formValidation.emailError.isError}
        errorMessage={formValidation.emailError.errorMessage}
        inputValue={userInput.email}
        onChangeInput={onChangeInput}
        placeholder="Enter your email address"
        inputType="email"
        name="email"
      />

      <Input
        isError={formValidation.passwordError.isError}
        errorMessage={formValidation.passwordError.errorMessage}
        inputValue={userInput.password}
        onChangeInput={onChangeInput}
        inputType="password"
        name="password"
        placeholder="Enter your password"
      />
    </Form>
  );
};

export default Signin;
