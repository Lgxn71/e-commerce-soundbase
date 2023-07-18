import styles from "./Navigation.module.css";

const Navigation = ({ isGeneral, onSetIsGeneral, isLoading }) => {
  const changeToGeneralHandler = () => {
    onSetIsGeneral(true);
  };
  const changeToPurchaseHandler = () => {
    onSetIsGeneral(false);
  };

  if (isLoading) {
    return (
      <aside>
        <ul className={styles.links}>
          <li>
            <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
          </li>
          <li>
            <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
          </li>
        </ul>
      </aside>
    );
  }

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
