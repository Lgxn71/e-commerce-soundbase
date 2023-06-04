import { atom, selector } from "recoil";
export const cartState = atom({
  key: "cart",
  default: [],
});
