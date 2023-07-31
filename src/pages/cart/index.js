import { loadStripe } from "@stripe/stripe-js";

import Cart from "../../../components/Cart/Cart";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const CartPage = () => {
  return <Cart stripePromise={stripePromise} />;
};

export default CartPage;
