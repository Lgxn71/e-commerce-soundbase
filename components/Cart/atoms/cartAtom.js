import { atom } from "recoil";

export const cartState = atom({
  key: "cart",
  default: {
    cartItems: [],
    cartTotalPrice: 0,
  },
});

// export const cartState = atom({
//   key: "cart",
//   default: [],
// });

// export const cartSumState = atom({
//   key: "cartSum",
//   default: 0,
// });
