import styles from "./UserDataCard.module.css";
const UserDataCard = ({ title, label, bottomText }) => {
  return (
    <div>
      <form action="">
        <h3>{title}</h3>
        <label>{label}</label>
        <input type="text" name="name" id="name" />
        <div>
          <p>{bottomText}</p>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};

export default UserDataCard;
