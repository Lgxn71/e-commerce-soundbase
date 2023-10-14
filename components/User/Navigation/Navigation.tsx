import { FC, Dispatch, SetStateAction } from "react";

import styles from "./Navigation.module.css";

interface INavigationProps {
  isGeneral?: boolean | string;
  onSetIsGeneral?: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
}

const Navigation: FC<INavigationProps> = ({
  isGeneral,
  onSetIsGeneral,
  isLoading,
}) => {
  const changeToGeneralHandler = () => {
    if (onSetIsGeneral !== undefined) onSetIsGeneral((prev) => true);
  };
  const changeToPurchaseHandler = () => {
    if (onSetIsGeneral !== undefined) onSetIsGeneral((prev) => false);
  };

  if (isLoading) {
    return (
      <aside>
        <ul className={styles.links}>
          <li>
            <div className={`${styles.skeletonText} skeleton`}></div>
          </li>
          <li>
            <div className={`${styles.skeletonText} skeleton`}></div>
          </li>
        </ul>
      </aside>
    );
  }

  return (
    <aside>
      <ul className={styles.links}>
        <li onClick={changeToGeneralHandler}>
          <a className={`${isGeneral && styles.active}`}>General</a>
        </li>
        <li onClick={changeToPurchaseHandler}>
          <a className={`${!isGeneral && styles.active}`}>Purchase History</a>
        </li>
      </ul>
    </aside>
  );
};

export default Navigation;
