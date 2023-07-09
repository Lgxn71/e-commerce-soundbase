import styles from "./UserPurchaseHistory.module.css";

const UserPurchaseHistory = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>Purchase History</h4>
        <h4>Total Purchase: {6} </h4>
      </div>
      <div className={styles.body}>
        <div className={styles.albumName}>
          <h5>Order Id</h5>
          <p></p>
        </div>
        <div className={styles.artist}>
          <h5>Artist</h5>
          <p></p>
        </div>
        <div className={styles.quantity}>
          <h5>Quantity</h5>
          <p></p>
        </div>
        <div className={styles.price}>
          <h5>Price</h5>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default UserPurchaseHistory;
