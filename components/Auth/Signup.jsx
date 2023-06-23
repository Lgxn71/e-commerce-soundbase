import Form from "../UI/Form/Form";

import styles from "./Signup.module.css";
const Signup = ({
  session,
  onChangeInput,
  formSubmitHandler,
  formValidation,
}) => {
  return session.status === "authenticated" ? (
    <p>Please logout to signup in a new account</p>
  ) : (
    <>
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
            formValidation.emailError.isError
              ? styles.isError
              : styles.noErrorInput
          }`}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          required
          onChange={onChangeInput}
        />
        {formValidation.emailError.isError ? (
          <p className={styles.errorMessage}>
            {formValidation.emailError.errorMessage}
          </p>
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
