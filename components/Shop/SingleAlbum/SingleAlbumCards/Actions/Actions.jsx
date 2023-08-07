import Button from "../../../../UI/Buttons/Button";
import ButtonEmptyBlack from "../../../../UI/Buttons/ButtonEmptyBlack";

import { inter } from "../../../../../src/pages/_app";

import styles from "./Actions.module.css";

const Actions = ({ onAddToCart, Link }) => {
  return (
    <div className={`${inter.variable} ${styles.actions}`}>
      <Link href={`/cart`} className={styles.purchaseBtn}>
        <Button id="Cart">Cart</Button>
      </Link>

      <div className={styles.addToCartBtn}>
        <ButtonEmptyBlack onClick={onAddToCart} className={styles.addToCart}>
          Add to Cart
        </ButtonEmptyBlack>
      </div>
    </div>
  );
};

export default Actions;
