import { useEffect } from "react";

import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { ICart, cartState } from "../../Cart/CartAtom/cartAtom";

import HeaderLoading from "./HeaderLoading/HeaderLoading";

import HeaderLinks from "./HeaderLinks/HeaderLinks";

import ActionsAuth from "./Actions/ActionsAuth";
import ActionUnauth from "./Actions/ActionsUnAuth";

import Container from "../../UI/Container/Container";
import Logo from "../../UI/Logo/Logo";

import { poppins } from "../../../src/pages/_app";

import styles from "./Header.module.css";

const Header = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const { asPath } = useRouter();

  const session = useSession();

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      const localStorageCart = localStorage.getItem("cart");
      if (localStorageCart) {
        const cartCurrent: ICart = JSON.parse(localStorageCart);
        if (cartCurrent !== null || !cart.cartItems) {
          setCart((prev) => cartCurrent);
        }
      }
    }
  }, [setCart]);

  return (
    <header className={`${styles.header} ${poppins.variable}`}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/">
            <h3 className={styles.logo}>
              <Logo />
            </h3>
          </Link>

          {session.status === "loading" ? (
            <>
              <nav className={styles.links}>
                <HeaderLoading isLinks={true} />
              </nav>
              <div className={styles.actions}>
                <HeaderLoading isLinks={false} />
              </div>
            </>
          ) : (
            <>
              <nav className={styles.links}>
                <HeaderLinks
                  asPath={asPath}
                  cartQuantityCounter={cart.cartQuantityCounter}
                />
              </nav>

              <div className={styles.actions}>
                {session.status === "authenticated" ||
                !session === undefined ? (
                  <ActionsAuth asPath={asPath} />
                ) : (
                  <ActionUnauth />
                )}
              </div>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
