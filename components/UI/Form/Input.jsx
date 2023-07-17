import styles from "./Input.module.css";
const Input = ({
  children,
  isError,
  errorMessage,
  inputValue,
  onChangeInput,
  placeholder,
  inputType,
  name,
}) => {
  return (
    <>
      <input
        value={inputValue}
        className={`${styles.input} 
           ${isError ? styles.isError : styles.noErrorInput}`}
        type={inputType}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChangeInput}
      />
      {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default Input;
