import styles from "./Button.module.css";

const Button = ({ children, isViolet }) => {
  return (
    <button
      className={` 
      ${styles.button}
      ${isViolet ? styles.buttonViolet : undefined}
     `}
    >
      {children}
    </button>
  );
};

export default Button;
