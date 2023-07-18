import styles from "./WhiteCross.module.css";
const WhiteCross = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.crossContainer}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.99961 8.04998L1.74961 13.3C1.59961 13.45 1.42461 13.525 1.22461 13.525C1.02461 13.525 0.849609 13.45 0.699609 13.3C0.549609 13.15 0.474609 12.975 0.474609 12.775C0.474609 12.575 0.549609 12.4 0.699609 12.25L5.94961 6.99998L0.699609 1.74998C0.549609 1.59998 0.474609 1.42498 0.474609 1.22498C0.474609 1.02498 0.549609 0.849976 0.699609 0.699976C0.849609 0.549976 1.02461 0.474976 1.22461 0.474976C1.42461 0.474976 1.59961 0.549976 1.74961 0.699976L6.99961 5.94998L12.2496 0.699976C12.3996 0.549976 12.5746 0.474976 12.7746 0.474976C12.9746 0.474976 13.1496 0.549976 13.2996 0.699976C13.4496 0.849976 13.5246 1.02498 13.5246 1.22498C13.5246 1.42498 13.4496 1.59998 13.2996 1.74998L8.04961 6.99998L13.2996 12.25C13.4496 12.4 13.5246 12.575 13.5246 12.775C13.5246 12.975 13.4496 13.15 13.2996 13.3C13.1496 13.45 12.9746 13.525 12.7746 13.525C12.5746 13.525 12.3996 13.45 12.2496 13.3L6.99961 8.04998Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default WhiteCross;
