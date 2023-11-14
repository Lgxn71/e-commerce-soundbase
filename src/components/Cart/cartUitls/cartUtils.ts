import { ICart } from "../CartAtom/cartAtom";

import { Album } from "../../../types/db";

export const addItemToCart = (cart: ICart, album: Album) => {
  const existingItem = cart.cartItems.find(
    (cartItem) => cartItem._id === album._id
  );

  if (existingItem) {
    const updatedItems = cart.cartItems.map((item) =>
      item._id === album._id ? { ...item, quantity: item.quantity! + 1 } : item
    );

    return {
      ...cart,
      cartItems: updatedItems,
    };
  } else {
    return {
      ...cart,
      cartItems: [...cart.cartItems, { ...album, quantity: 1 }],
    };
  }
};

export const decreaseCartItem = (cart: ICart, album: Album) => {
  const existingItem = cart.cartItems.find((item) => item._id === album._id);

  if (existingItem) {
    if (existingItem.quantity === 1) {
      const updatedItems = cart.cartItems.filter(
        (item) => item._id !== album._id
      );

      return { ...cart, cartItems: [...updatedItems] };
    } else {
      const updatedItems = cart.cartItems.map((item) =>
        item._id === album._id
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      );

      return { ...cart, cartItems: [...updatedItems] };
    }
  }
};
export const removeCartItem = (cart: ICart, album: Album) => {
  const filteredCart = cart.cartItems.filter((item) => item._id !== album._id);

  if (filteredCart) {
    const { cartQuantityCounter, cartTotalPrice } =
      recalculateCartPricesAndQuanity(filteredCart);

    return { cartItems: filteredCart, cartQuantityCounter, cartTotalPrice };
  }
};

export const recalculateCartPricesAndQuanity = (updatedItems: Album[]) => {
  let cartQuantityCounter = 0;
  for (let i = 0; i < updatedItems.length; i++) {
    cartQuantityCounter += updatedItems[i].quantity!;
  }

  let cartTotalPrice = 0;
  const arrayOfPrices = updatedItems.map((item) => item.price * item.quantity!);
  for (let i = 0; i < arrayOfPrices.length; i++) {
    cartTotalPrice += arrayOfPrices[i];
  }
  return { cartQuantityCounter, cartTotalPrice };
};
