import { useState } from "react";

import { useRecoilValue } from "recoil";
import { cartState } from "../../components/Cart/CartAtom/cartAtom";

import SignInPopup from "../../components/Cart/SignInPopup/SignInPopup";
import CartEmpty from "../../components/Cart/CartEmpty/CartEmpty";
import Cart from "../../components/Cart/Cart/Cart";

import Container from "../../components/UI/Container/Container";
import PageTitle from "../../components/UI/PageTitle/PageTitle";

const CartPage = () => {
  const cart = useRecoilValue(cartState);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onPopupOpen = () => setModalOpen((prev) => true);

  const onPopupClose = () => setModalOpen((prev) => false);

  return (
    <>
      {isModalOpen && <SignInPopup onClose={onPopupClose} />}

      <Container>
        <PageTitle title="Cart" />
      </Container>

      <Container isBorderThere={true}>
        {cart.cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <Cart onPopupOpen={onPopupOpen} cart={cart} />
        )}
      </Container>
    </>
  );
};

export default CartPage;
