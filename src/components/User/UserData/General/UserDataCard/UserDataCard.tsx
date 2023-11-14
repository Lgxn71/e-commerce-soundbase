import { FC, ChangeEvent, FormEvent } from "react";

import Input from "../../../../UI/Form/Input";
import Buttons from "../../../../UI/Buttons/Buttons";

import styles from "./UserDataCard.module.css";

interface IUserDataCard {
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  title?: string;
  label?: string;
  bottomText?: string;
  inputValue?: string;
  inputType?: string;
  name?: string;
  isError?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}

const UserDataCard: FC<IUserDataCard> = ({
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
  if (isLoading)
    return (
      <form>
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

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.detailContainer}>
        <h3>{title}</h3>
        <label htmlFor={name}>{label}</label>
        <Input
          value={inputValue}
          name={name}
          type={inputType}
          onChangeInput={onChangeInput}
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>

      <div className={styles.detailsBottom}>
        <p>{bottomText}</p>
        <Buttons.Gray>Save</Buttons.Gray>
      </div>
    </form>
  );
};

export default UserDataCard;
