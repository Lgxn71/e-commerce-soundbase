import { FC, useState } from "react";

import OrderPopup from "./OrderPopup";

import styles from "./SingleOrderCard.module.css";

import { Order } from "../../../../../src/types/db";

interface ISingleOrderCardProps {
  order?: Order;
  isLoading?: boolean;
}

const SingleOrderCard: FC<ISingleOrderCardProps> = ({ order, isLoading }) => {
  const [isPopupShown, setIsPopUpShown] = useState(false);

  if (isLoading)
    return (
      <div className={styles.card}>
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

  if (order) {
    const formattedId = order.orderId.slice(0, 7);

    const originalDate = order.date.toString();
    const dateOnly = originalDate.split("T")[0];
    const [year, month, day] = dateOnly.split("-");
    const formattedDate = `${day}.${month}.${year}`;

    let orderSum = 0;
    const shipping = 15;
    for (let i = 0; i < order.albums.length; i++) {
      orderSum += order.albums[i].price;
    }

    const showPopupHandler = () => setIsPopUpShown((prev) => true);

    const closePopupHandler = () => setIsPopUpShown((prev) => false);

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
          <div className={styles.col1}>
            <p className={styles.title}>Order Id</p>
            <p>{formattedId}</p>
          </div>

          <div className={styles.col2}>
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
        </div>
      </>
    );
  }
};

export default SingleOrderCard;
