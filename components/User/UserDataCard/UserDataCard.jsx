import { inter } from "@/pages/_app";

import styles from "./UserDataCard.module.css";
import Input from "../../UI/Form/Input";

const UserDataCard = ({
  title,
  label,
  bottomText,
  onSubmit,
  inputValue,
  onChangeInput,
  inputType,
  name,
  isError,
  errorMessage,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={styles.detailContainer}>
          <h3>{title}</h3>
          <label htmlFor={name}>{label}</label>
          <Input
            inputValue={inputValue}
            name={name}
            inputType={inputType}
            onChangeInput={onChangeInput}
            isError={isError}
            errorMessage={errorMessage}
          />
        </div>

        <div className={styles.detailsBottom}>
          <p>{bottomText}</p>
          <button className={`${styles.button} ${inter.className}`}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDataCard;
