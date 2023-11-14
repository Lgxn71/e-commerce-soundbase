import { atom } from "recoil";

import { Album } from "../../../types/db";

export interface ICart {
  cartItems: Album[];
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
