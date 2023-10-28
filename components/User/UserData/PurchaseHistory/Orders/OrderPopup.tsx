import { FC } from "react";

import Popup from "../../../../UI/Popup/Popup";
import Button from "../../../../UI/Buttons/Button";

import styles from "./OrderPopup.module.css";

import { Order } from "../../../../../src/types/db";

interface IOrderPopupProps {
  order: Order;
  formattedDate: string;
  formattedId: string;
  quantity: number;
  shipping: number;
  closePopupHandler: () => void;
  orderSum: number;
}

const OrderPopup: FC<IOrderPopupProps> = ({
  order,
  formattedDate,
  formattedId,
  quantity,
  shipping,
  closePopupHandler,
  orderSum,
}) => (
  <Popup
    title="Order Details"
    body={
      <div className={styles.popupBody}>
        <div className={styles.orderDetails}>
          <div className={styles.orderedAlbums}>
            <p>My Order</p>
            <ul className={styles.highlight}>
              {order.albums.map((album) => (
                <li key={album._id.toString()}>
                  <span>{album.albumName}</span>{" "}
                  <span className={styles.greyColor}>by </span>
                  <span className={styles.highlight}> {album.artist} </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.cardData}>
            <div className={styles.row}>
              <p>OrderId</p>
              <p className={`${styles.highlight} ${styles.cardDataDetails}`}>
                {formattedId}
              </p>
            </div>
            <div className={styles.row}>
              <p>Quantity: </p>
              <p className={`${styles.highlight} ${styles.cardDataDetails}`}>
                {quantity}
              </p>
            </div>
            <div className={styles.row}>
              <p>Date:</p>
              <p className={`${styles.highlight} ${styles.cardDataDetails}`}>
                {formattedDate}
              </p>
            </div>
            <div className={styles.row}>
              <p>Shipping: </p>
              <p className={`${styles.highlight} ${styles.cardDataDetails}`}>
                $ {shipping}
              </p>
            </div>
            <div className={styles.row}>
              <p>Price: </p>
              <p className={`${styles.highlight} ${styles.cardDataDetails}`}>
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
  />
);

export default OrderPopup;
