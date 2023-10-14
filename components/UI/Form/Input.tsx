import { FC, ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMessage?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  isError,
  errorMessage,
  onChangeInput,
  ...props
}) => {
  return (
    <>
      <input
        {...props}
        className={`${styles.input} 
           ${isError ? styles.isError : styles.noErrorInput}`}
        onChange={onChangeInput}
      />
      {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default Input;
