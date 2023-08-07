export const addItemToCart = (cart, album) => {
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

export const decreaseCartItem = (cart, album) => {
  const existingItem = cart.cartItems.find((item) => item._id === album._id);

  if (existingItem.quantity === 1) {
    const updatedItems = cart.cartItems.filter(
      (item) => item._id !== album._id
    );
    return { ...cart, cartItems: [...updatedItems] };
  } else {
    const updatedItems = cart.cartItems.map((item) =>
      item._id === album._id ? { ...item, quantity: item.quantity - 1 } : item
    );
    return { ...cart, cartItems: [...updatedItems] };
  }
};
