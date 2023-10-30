import Link from "next/link";

import Buttons from "../../../../UI/Buttons/Buttons";

import { inter } from "../../../../../src/pages/_app";

import styles from "./Actions.module.css";
import { FC, MouseEventHandler } from "react";

interface IActionsProps {
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
}

const Actions: FC<IActionsProps> = ({ onAddToCart }) => {
  return (
    <div className={`${inter.variable} ${styles.actions}`}>
      <Link href={`/cart`} className={styles.purchaseBtn}>
        <Buttons.White id="Cart">Cart</Buttons.White>
      </Link>

      <div className={styles.addToCartBtn}>
        <Buttons.EmptyBlack onClick={onAddToCart}>
          Add to Cart
        </Buttons.EmptyBlack>
      </div>
    </div>
  );
};

export default Actions;
