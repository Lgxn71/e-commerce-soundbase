import { MouseEventHandler } from "react";

import Link from "next/link";

import Buttons from "../../../../UI/Buttons/Buttons";

import styles from "./Actions.module.css";

import { inter } from "../../../../../pages/_app";

const Actions = ({
  onAddToCart,
}: {
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
}) => {
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
