import { atom } from "recoil";

import { Record } from "../../../src/types/db";

export interface ICart {
  cartItems: Record[];
  cartTotalPrice: number;
  cartQuantityCounter: number;
}

export const cartState = atom<ICart>({
  key: "cart",
  default: {
    cartItems: [],
    cartTotalPrice: 0,
    cartQuantityCounter: 0,
  },
});
