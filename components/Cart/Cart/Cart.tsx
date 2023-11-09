import PaymentDetails from "./PaymentDetails/PaymentDetails";
import CartAlbum from "./CartAlbum/CartAlbum";

import styles from "./Cart.module.css";
import { ICart } from "../CartAtom/cartAtom";

const Cart = ({
  cart,
  onPopupOpen,
}: {
  cart: ICart;
  onPopupOpen: () => void;
}) => {
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cart}>
        {cart.cartItems.map((album) => (
          <CartAlbum key={album._id.toString()} album={album} />
        ))}
      </div>

      <PaymentDetails cart={cart} onPopupOpen={onPopupOpen} />
    </div>
  );
};

export default Cart;
