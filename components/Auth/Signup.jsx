import Layout from "../Layout/Layout";
import Form from "../UI/Form/Form";
import Input from "../UI/Form/Input";

import styles from "./Signup.module.css";
const Signup = ({
  session,
  onChangeInput,
  formSubmitHandler,
  formValidation,
  userInput,
}) => {
  return session.status === "authenticated" ? (
    <Layout>
      <p>Please logout to signup in a new account</p>
    </Layout>
  ) : (
    <>
      <Form
        hrefLink={"/auth/signin"}
        text="Already"
        hrefText="Sign In"
        title="Sign up"
        formSubmitHandler={formSubmitHandler}
      >
        <Input
          inputType="text"
          name="name"
          placeholder="Enter your name"
          inputValue={userInput.name}
          onChangeInput={onChangeInput}
        />

        <Input
          isError={formValidation.emailError.isError}
          errorMessage={formValidation.emailError.errorMessage}
          inputValue={userInput.email}
          onChangeInput={onChangeInput}
          inputType="email"
          name="email"
          placeholder="Enter your email address"
        />

        <Input
          inputType="text"
          name="address"
          placeholder="Enter your home address"
          inputValue={userInput.address}
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
    </>
  );
};

export default Signup;
