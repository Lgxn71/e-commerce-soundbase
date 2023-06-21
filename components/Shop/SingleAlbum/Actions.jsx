import { inter } from "@/pages/_app";

import Button from "../../UI/Buttons/Button";
import ButtonEmptyBlack from "../../UI/Buttons/ButtonEmptyBlack";

import styles from "./Actions.module.css";

const Actions = ({ onAddToCart }) => {
  return (
    <div className={`${inter.variable} ${styles.actions}`}>
      <div className={styles.purchaseBtn}>
        <Button id="purchaseBtn">Purchase</Button>
      </div>

      <div className={styles.addToCartBtn}>
        <ButtonEmptyBlack onClick={onAddToCart} className={styles.addToCart}>
          Add to Cart
        </ButtonEmptyBlack>
      </div>
    </div>
  );
};

export default Actions;
