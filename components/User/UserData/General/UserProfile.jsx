import UserDataCard from "./UserDataCard";

import styles from "./UserProfile.module.css";
const UserProfile = ({
  userData,
  onHandleInputChange,
  onHandleSubmit,
  formValidation,
}) => {
  return (
    <div className={styles.details}>
      <UserDataCard
        title="Full Name"
        label="Please enter your full name, or a display name you are comfortable with"
        bottomText="Please use 32 characters at maximum."
        inputValue={userData.nameInput}
        onChangeInput={(event) => onHandleInputChange(event, "nameInput")}
        onSubmit={(event) => onHandleSubmit(event, "name", userData.nameInput)}
        inputType="text"
        name="name"
        isError={formValidation.nameInput.isError}
        errorMessage={formValidation.nameInput.errorMessage}
      />

      <UserDataCard
        title="Email"
        label="Please enter the email address you want to use to log in with Soundbase."
        bottomText="We will email you to verify the change"
        inputValue={userData.emailInput}
        onChangeInput={(event) => onHandleInputChange(event, "emailInput")}
        onSubmit={(event) =>
          onHandleSubmit(event, "email", userData.emailInput)
        }
        inputType="email"
        name="email"
        isError={formValidation.emailInput.isError}
        errorMessage={formValidation.emailInput.errorMessage}
      />

      <UserDataCard
        title="Address"
        label="Please enter the address where you want to ship your vinyls."
        bottomText="We will email you to verify the change"
        inputValue={userData.addressInput}
        onChangeInput={(event) => onHandleInputChange(event, "addressInput")}
        onSubmit={(event) =>
          onHandleSubmit(event, "address", userData.addressInput)
        }
        inputType="text"
        name="address"
        isError={formValidation.addressInput.isError}
        errorMessage={formValidation.addressInput.errorMessage}
      />
    </div>
  );
};

export default UserProfile;
