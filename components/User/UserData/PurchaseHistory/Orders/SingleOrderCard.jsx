import { useState } from "react";

import styles from "./SingleOrderCard.module.css";
import OrderPopup from "./OrderPopup";

const SingleOrderCard = ({ order, loading }) => {
  const [isPopupShown, setIsPopUpShown] = useState(false);

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.idContainer}>
          <div className={`${styles.skeletonText} skeleton`} />
          <div className={`${styles.skeletonText} skeleton`} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={`${styles.skeletonText} skeleton`} />
          <div className={`${styles.skeletonText} skeleton`} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={`${styles.skeletonText} skeleton`} />
          <div className={`${styles.skeletonText} skeleton`} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={`${styles.skeletonText} skeleton`} />
          <div className={`${styles.skeletonText} skeleton`} />
        </div>
      </div>
    );
  }

  const formattedId = order.orderId.slice(0, 7);

  const originalDate = order.date;
  const dateOnly = originalDate.split("T")[0];
  const [year, month, day] = dateOnly.split("-");
  const formattedDate = `${day}.${month}.${year}`;

  let orderSum = 0;
  const shipping = 15;
  for (let i = 0; i < order.albums.length; i++) {
    orderSum += order.albums[i].price;
  }

  const showPopupHandler = () => {
    setIsPopUpShown(true);
  };
  const closePopupHandler = () => {
    setIsPopUpShown(false);
  };

  return (
    <>
      {isPopupShown && (
        <OrderPopup
          order={order}
          quantity={order.albums.length}
          shipping={shipping}
          orderSum={orderSum}
          formattedDate={formattedDate}
          formattedId={formattedId}
          closePopupHandler={closePopupHandler}
        />
      )}

      <div onClick={showPopupHandler} className={styles.card}>
        <div className={styles.idContainer}>
          <p className={styles.title}>Order Id</p>
          <p>{formattedId}</p>
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.title}>Quantity</p>
          <p>{order.albums.length}</p>
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.title}>Date</p>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.title}>Price</p>
          <p>$ {orderSum + shipping}</p>
        </div>
      </div>
    </>
  );
};

export default SingleOrderCard;
