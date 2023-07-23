import { inter } from "../../../../src/pages/_app";

import Input from "../../../UI/Form/Input";

import styles from "./UserDataCard.module.css";

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
  isLoading,
}) => {
  if (isLoading) {
    return (
      <form onSubmit={onSubmit}>
        <div className={styles.detailContainer}>
          <div className={`skeleton ${styles.skeletonTextTitle}`} />
          <div className={`skeleton ${styles.skeletonText}`} />
          <div className={`skeleton ${styles.skeletonInput}`} />
        </div>

        <div className={styles.detailsBottom}>
          <div className={`skeleton ${styles.skeletonTextNoMargin}`} />
          <div className={`skeleton ${styles.skeletonButton}`} />
        </div>
      </form>
    );
  }

  return (
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
        <button className={`${styles.button} ${inter.className}`}>Save</button>
      </div>
    </form>
  );
};

export default UserDataCard;
