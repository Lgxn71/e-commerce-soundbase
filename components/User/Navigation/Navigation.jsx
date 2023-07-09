import styles from "./Navigation.module.css";

const Navigation = ({ isGeneral, onSetIsGeneral }) => {
  const changeToGeneralHandler = () => {
    onSetIsGeneral(true);
  };
  const changeToPurchaseHandler = () => {
    onSetIsGeneral(false);
  };

  return (
    <aside>
      <ul className={styles.links}>
        <li onClick={changeToGeneralHandler}>
          <a className={isGeneral ? styles.active : ""}>General</a>
        </li>
        <li onClick={changeToPurchaseHandler}>
          <a className={!isGeneral ? styles.active : ""}>Purchase History</a>
        </li>
      </ul>
    </aside>
  );
};

export default Navigation;
