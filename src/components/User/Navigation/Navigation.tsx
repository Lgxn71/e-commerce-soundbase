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
            <div className={`${styles.skeletonText} skeleton`} />
          </li>
          <li>
            <div className={`${styles.skeletonText} skeleton`} />
          </li>
        </ul>
      </aside>
    );
  }

  return (
    <aside>
      <ul className={styles.links}>
        <li onClick={changeToGeneralHandler}>
          <p className={`${isGeneral && styles.active}`}>General</p>
        </li>
        <li onClick={changeToPurchaseHandler}>
          <p className={`${!isGeneral && styles.active}`}>Purchase History</p>
        </li>
      </ul>
    </aside>
  );
};

export default Navigation;
