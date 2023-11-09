import styles from "./HeaderLoading.module.css";
const HeaderLoading = ({ isLinks }: { isLinks: boolean }) => {
  if (isLinks) {
    return (
      <>
        <div className={`${styles.skeletonText} skeleton`} />
        <div className={`${styles.skeletonText} skeleton`} />
      </>
    );
  }
  return (
    <>
      <div className={`${styles.skeletonButton} skeleton`} />
      <div className={`${styles.skeletonText} skeleton`} />
    </>
  );
};

export default HeaderLoading;
