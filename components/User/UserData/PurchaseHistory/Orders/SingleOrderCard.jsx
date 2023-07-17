import { useState } from "react";

import Popup from "../../../../UI/Popup/Popup";

import styles from "./SingleOrderCard.module.css";
import Button from "../../../../UI/Buttons/Button";

const SingleOrderCard = ({ order }) => {
  const [isPopupShown, setIsPopUpShown] = useState(false);

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
        <Popup
          body={
            <div className={styles.popupBody}>
              <div className={styles.orderDetails}>
                <div className={styles.orderedAlbums}>
                  <p>My Order</p>
                  <p className={styles.highlight}>
                    <span>Album</span> <span>by </span>
                    <span className={styles.highlight}> Artist </span>
                  </p>
                </div>

                <div className={styles.cardData}>
                  <div className={styles.row}>
                    <p>OrderId</p>
                    <p
                      className={`${styles.highlight} ${styles.cardDataDetails}`}
                    >
                      {formattedId}
                    </p>
                  </div>
                  <div className={styles.row}>
                    <p>Quantity: </p>
                    <p
                      className={`${styles.highlight} ${styles.cardDataDetails}`}
                    >
                      {order.albums.length}
                    </p>
                  </div>
                  <div className={styles.row}>
                    <p>Date:</p>
                    <p
                      className={`${styles.highlight} ${styles.cardDataDetails}`}
                    >
                      {formattedDate}
                    </p>
                  </div>
                  <div className={styles.row}>
                    <p>Shipping: </p>
                    <p
                      className={`${styles.highlight} ${styles.cardDataDetails}`}
                    >
                      $ {shipping}
                    </p>
                  </div>
                  <div className={styles.row}>
                    <p>Price: </p>
                    <p
                      className={`${styles.highlight} ${styles.cardDataDetails}`}
                    >
                      $ {orderSum}
                    </p>
                  </div>
                </div>

                <div className={styles.priceDetails}>
                  <p>Total Price</p>
                  <p>
                    USD <span>$ {orderSum + shipping}</span>
                  </p>
                </div>

                <div className={styles.actions}>
                  <Button onClick={closePopupHandler}>Close</Button>
                </div>
              </div>
            </div>
          }
          onClose={closePopupHandler}
          title="Order Details"
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
