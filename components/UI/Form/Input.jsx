import styles from "./Input.module.css";

const Input = ({ type, placeholder, onChange, isError, errorText, name }) => {
  console.log(name);
  return (
    <>
      <input
        className={`${styles.input} ${
          isError ? styles.isError : styles.noErrorInput
        }`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required
        onChange={onChange}
      />
      {isError ? <p className={styles.errorMessage}>{errorText}</p> : undefined}
    </>
  );
};

export default Input;
