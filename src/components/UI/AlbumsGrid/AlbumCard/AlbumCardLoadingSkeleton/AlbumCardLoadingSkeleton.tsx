import styles from "./AlbumCardLoadingSkeleton.module.css";

const AlbumCardLoadingSkeleton = () => (
  <>
    <div className={`${styles.skeletonImage} skeleton`} />

    <div className={`${styles.skeletonTitle} skeleton`} />

    <div className={`${styles.skeletonText} skeleton`} />

    <div className={styles.actions}>
      <div className={`${styles.skeletonTextShorter} skeleton`} />
      <div className={`${styles.skeletonButton} skeleton`} />
    </div>
  </>
);

export default AlbumCardLoadingSkeleton;
