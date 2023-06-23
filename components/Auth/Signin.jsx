import Form from "../UI/Form/Form";

import styles from "./Signin.module.css";

const Signin = ({ formSubmitHandler, onChangeInput, formValidation }) => {
  return (
    <Form
      hrefLink={"/auth/signup"}
      text="Don’t"
      hrefText="Sign Up"
      title="Sign in"
      formSubmitHandler={formSubmitHandler}
    >
      <input
        className={`${styles.input}
            ${
              formValidation.emailError.isError
                ? styles.isError
                : styles.noErrorInput
            } `}
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email address"
        required
        onChange={onChangeInput}
      />
      {formValidation.emailError.isError && (
        <p className={styles.errorMessage}>
          {formValidation.emailError.errorMessage}
        </p>
      )}

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
        onChange={onChangeInput}
      />
      {formValidation.passwordError.isError && (
        <p className={styles.errorMessage}>
          {formValidation.passwordError.errorMessage}
        </p>
      )}
    </Form>
  );
};

export default Signin;
