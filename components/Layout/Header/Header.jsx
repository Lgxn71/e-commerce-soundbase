import { useEffect } from "react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/CartAtom/cartAtom";

import Link from "next/link";

import ActionsAuth from "./Actions/ActionsAuth";
import ActionUnauth from "./Actions/ActionsUnAuth";

import Container from "../../UI/Container/Container";
import Logo from "../../UI/Logo/Logo";

import { poppins } from "../../../src/pages/_app";

import styles from "./Header.module.css";

const Header = () => {
  const [cart, setCart] = useRecoilState(cartState);
  console.log(cart);
  console.log(typeof cart.cartItems);
  console.log(cart.cartItems.length);

  const { asPath } = useRouter();

  const session = useSession();

  useEffect(() => {
    try {
      if (cart.cartItems.length === 0) {
        const cartCurrent = localStorage.getItem("cart");
        console.log(typeof cartCurrent);
        if (typeof cartCurrent !== null) {
          setCart((prevValue) => {
            return { ...prevValue, cartItems: cartCurrent };
          });
        } else {
          console.log("cart current is null");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [cart.cartItems.length, setCart]);

  useEffect(() => {
    try {
      if (cart.cartItems.length !== 0) {
        let countSumQuantity = 0;
        setCart((prevValue) => {
          for (let i = 0; i < cart.cartItems.length; i++) {
            countSumQuantity += cart.cartItems[i].quantity;
          }

          return { ...prevValue, cartLength: countSumQuantity };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [cart.cartItems, setCart]);

  if (session.status === "loading") {
    return (
      <header className={`${styles.header} ${poppins.variable}`}>
        <Container>
          <div className={styles.headerContent}>
            <Link href="/">
              <h3 className={styles.logo}>
                <Logo />
              </h3>
            </Link>

            <nav className={styles.links}>
              <div className={`${styles.skeletonText} skeleton`} />
              <div className={`${styles.skeletonText} skeleton`} />
            </nav>

            <div className={styles.actions}>
              <div className={`${styles.skeletonButton} skeleton`} />
              <div className={`${styles.skeletonText} skeleton`} />
            </div>
          </div>
        </Container>
      </header>
    );
  }

  const isLinkActive = (href) => asPath === href;

  return (
    <header className={`${styles.header} ${poppins.variable}`}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/">
            <h3 className={styles.logo}>
              <Logo />
            </h3>
          </Link>

          <nav className={styles.links}>
            <Link
              className={`${styles.navLink} 
            ${isLinkActive("/shop") ? styles.activeLink : styles.unActiveLink}`}
              key="shop"
              href="/shop"
            >
              Discover
            </Link>

            <Link
              className={`${styles.navLink} 
            ${isLinkActive("/cart") ? styles.activeLink : styles.unActiveLink}`}
              key="cart"
              href="/cart"
            >
              Cart <span className={styles.cartCounter}>{cart.cartLength}</span>
            </Link>
          </nav>

          <div className={styles.actions}>
            {session.status === "authenticated" || !session === undefined ? (
              <ActionsAuth Link={Link} session={session} asPath={asPath} />
            ) : (
              <ActionUnauth Link={Link} />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
