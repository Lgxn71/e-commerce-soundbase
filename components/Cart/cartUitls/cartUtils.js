export const updateCart = (cart, album) => {
  const existingItem = cart.cartItems.find(
    (cartItem) => cartItem._id === album._id
  );

  if (existingItem) {
    const updatedItems = cart.cartItems.map((item) =>
      item._id === album._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    return { ...cart, cartItems: updatedItems };
  } else {
    return {
      ...cart,
      cartItems: [...cart.cartItems, { ...album, quantity: 1 }],
    };
  }
};
